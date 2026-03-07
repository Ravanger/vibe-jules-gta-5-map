const fs = require('fs');
const path = require('path');
const { geographicToApp } = require('./map_converter.cjs');

const inputPath = path.join(__dirname, '..', '..', 'data', 'gta-v-locations.json');
const outputBaseDir = path.join(__dirname, '..', 'data');

if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
}

const dump = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Delete existing categories dir if it exists
const categoriesDir = path.join(outputBaseDir, 'categories');
if (fs.existsSync(categoriesDir)) {
    fs.rmSync(categoriesDir, { recursive: true, force: true });
}

const categoryGroups = Object.keys(dump);
const allExports = [];

categoryGroups.forEach(group => {
    const groupDir = path.join(outputBaseDir, group.toLowerCase());
    if (!fs.existsSync(groupDir)) {
        fs.mkdirSync(groupDir, { recursive: true });
    }

    const categories = dump[group];
    const categoryNames = Object.keys(categories);

    categoryNames.forEach(categoryName => {
        const sourceMarkers = categories[categoryName];
        if (!sourceMarkers || sourceMarkers.length === 0) return;

        // Use a slug to create a filename, e.g., "Playing Cards" -> "playing_cards"
        const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
        
        const convertedMarkers = sourceMarkers.map(m => {
            const coords = geographicToApp(m.lat, m.lng);
            
            let popupHtml = `<div class="p-1">`;
            
            // Media support with GLightbox
            if (m.media && m.media.length > 0) {
                const mediaUrl = m.media[0].url;
                popupHtml += `
  <div class="mb-3">
    <a href="${mediaUrl}" class="glightbox block overflow-hidden rounded-lg shadow-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors" data-gallery="${slug}">
      <img src="${mediaUrl}" alt="${m.title.replace(/"/g, '&quot;')}" class="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-300" />
    </a>
  </div>`;
            }

            popupHtml += `
  <div class="flex justify-between items-start gap-4 mb-2">
    <h3 class="text-lg font-bold text-white leading-tight">${m.title}</h3>
    <button class="copy p-1.5 bg-gray-700/50 hover:bg-blue-500 text-gray-400 hover:text-white rounded transition-colors"
      data-clipboard-text="${coords.lat}, ${coords.lng}"
      title="Copy Location">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    </button>
  </div>`;

            if (m.description) {
                popupHtml += `\n  <p class="text-gray-300 text-sm leading-relaxed mb-3">${m.description}</p>`;
            }
            
            popupHtml += `\n</div>`;

            return {
                lat: coords.lat,
                lng: coords.lng,
                title: m.title,
                icon: m.icon,
                popupHtml: popupHtml
            };
        });

        const filename = `${slug}.json`;
        const filePath = path.join(groupDir, filename);

        fs.writeFileSync(filePath, JSON.stringify(convertedMarkers, null, 2));

        allExports.push({
            id: slug,
            name: categoryName,
            group: group,
            importPath: `./${group.toLowerCase()}/${filename}`,
            importName: `${slug}_${group.toLowerCase()}`.replace(/(_.)/g, match => match[1].toUpperCase())
        });
    });
});

// Write src/data/categories.ts
let tsContent = `import type { CategoryDefinition, MarkerData } from '../types';\n\n`;

allExports.forEach(exp => {
    tsContent += `import ${exp.importName} from '${exp.importPath}';\n`;
});

// Group exports by CategoryGroup for clarity
categoryGroups.forEach(group => {
    const groupExports = allExports.filter(e => e.group === group);
    if (groupExports.length === 0) return;

    tsContent += `\nexport const ${group.toLowerCase()}: CategoryDefinition[] = [\n`;
    groupExports.forEach((exp, idx) => {
        tsContent += `  {
    id: '${exp.id}',
    name: '${exp.name.replace(/'/g, "\\'")}',
    group: '${group}',
    iconUrl: (m: MarkerData) => \`/images/markers/marker_\${m.icon}.png\`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: ${exp.importName} as MarkerData[],
    visible: ${['playing_card', 'ammu_nation'].includes(exp.id) ? 'true' : 'false'}
  }${idx < groupExports.length - 1 ? ',' : ''}\n`;
    });
    tsContent += `];\n`;
});

tsContent += `\nexport const categories: CategoryDefinition[] = [\n`;
categoryGroups.forEach((group, idx) => {
    const groupExports = allExports.filter(e => e.group === group);
    if (groupExports.length > 0) {
        tsContent += `  ...${group.toLowerCase()},\n`;
    }
});
tsContent += `];\n`;

fs.writeFileSync(path.join(outputBaseDir, 'categories.ts'), tsContent);

console.log(`Extraction complete. Created ${allExports.length} categories.`);
