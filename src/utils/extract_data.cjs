const fs = require('fs');
const path = require('path');
const { geographicToApp } = require('./map_converter.cjs');
const inputPath = path.join(__dirname, '..', '..', 'data', 'gta-v-locations.json');
const outputBaseDir = path.join(__dirname, '..', 'data');
const dump = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const ICON_MAPPING = {
    'ammu_nation': 'ammu_nation', 'atm': 'atm', 'automotive_shop': 'automotive_shop',
    'barber': 'barber', 'tattoo': 'tattoo', 'playing_card': 'playing_card',
    'letter_scrap': 'letter_scrap', 'spaceship_part': 'spaceship_part',
    'hidden_package': 'hidden_package', 'stunt_jump': 'stunt_jump',
    'under_the_bridge': 'under_the_bridge', 'knife_flight': 'knife_flight',
    'peyote_plant': 'peyote_plant', 'peyote_plant_online': 'peyote_plant',
    'monkey_mosaic': 'monkey_mosaic', 'wildlife_photography': 'wildlife_photography',
    'action_figure': 'action_figure', 'media_stick': 'media_stick',
    'ld_organics_product': 'ld_organics_product'
};
const categoryGroups = Object.keys(dump);
const allExports = [];
categoryGroups.forEach(group => {
    const groupDir = path.join(outputBaseDir, group.toLowerCase());
    if (!fs.existsSync(groupDir)) fs.mkdirSync(groupDir, { recursive: true });
    const categories = dump[group];
    const categoryNames = Object.keys(categories);
    categoryNames.forEach(categoryName => {
        const sourceMarkers = categories[categoryName];
        if (!sourceMarkers || sourceMarkers.length === 0) return;
        const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
        const convertedMarkers = sourceMarkers.map(m => {
            const coords = geographicToApp(m.lat, m.lng);
            let popupHtml = '<div class="p-1">';
            if (m.media && m.media.length > 0) {
                const mediaUrl = m.media[0].url;
                popupHtml += '\n  <div class="mb-3">\n    <a href="' + mediaUrl + '" class="glightbox block overflow-hidden rounded-lg shadow-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors" data-gallery="' + slug + '">\n      <img src="' + mediaUrl + '" alt="' + m.title.replace(/"/g, '&quot;') + '" class="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-300" />\n    </a>\n  </div>';
            }
            popupHtml += '\n  <div class="flex justify-between items-start gap-4 mb-2">\n    <h3 class="text-lg font-bold text-white leading-tight">' + m.title + '</h3>\n    <button class="copy p-1.5 bg-gray-700/50 hover:bg-blue-500 text-gray-400 hover:text-white rounded transition-colors" data-clipboard-text="' + coords.lat + ', ' + coords.lng + '" title="Copy Location">\n      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>\n    </button>\n  </div>';
            if (m.description) popupHtml += '\n  <p class="text-gray-300 text-sm leading-relaxed mb-3">' + m.description.replace(/"/g, '&quot;') + '</p>';
            popupHtml += '\n</div>';
            return { lat: coords.lat, lng: coords.lng, title: m.title, icon: m.icon, popupHtml: popupHtml };
        });
        const filename = slug + '.json';
        fs.writeFileSync(path.join(groupDir, filename), JSON.stringify(convertedMarkers, null, 2));
        allExports.push({ id: slug, name: categoryName, group: group, importPath: './' + group.toLowerCase() + '/' + filename, importName: (slug + '_' + group.toLowerCase()).replace(/(_.)/g, m => m[1].toUpperCase()) });
    });
});
let tsContent = 'import type { CategoryDefinition, MarkerData } from "../types";\n\n';
allExports.forEach(exp => { tsContent += 'import ' + exp.importName + ' from "' + exp.importPath + '";\n'; });
categoryGroups.forEach(group => {
    const groupExports = allExports.filter(e => e.group === group);
    if (groupExports.length === 0) return;
    tsContent += '\nexport const ' + group.toLowerCase() + ': CategoryDefinition[] = [\n';
    groupExports.forEach((exp, idx) => {
        const iconId = ICON_MAPPING[exp.id] ? '\n    iconId: "' + ICON_MAPPING[exp.id] + '",' : '';
        tsContent += '  {\n    id: "' + exp.id + '",\n    name: "' + exp.name.replace(/'/g, "\\'") + '",\n    group: "' + group + '",' + iconId + '\n    markers: ' + exp.importName + ' as MarkerData[],\n    visible: ' + (['playing_card', 'ammu_nation'].includes(exp.id) ? 'true' : 'false') + '\n  }' + (idx < groupExports.length - 1 ? ',' : '') + '\n';
    });
    tsContent += '];\n';
});
tsContent += '\nexport const categories: CategoryDefinition[] = [\n';
categoryGroups.forEach(group => { if (allExports.some(e => e.group === group)) tsContent += '  ...' + group.toLowerCase() + ',\n'; });
tsContent += '];\n';
fs.writeFileSync(path.join(outputBaseDir, 'categories.ts'), tsContent);
console.log('Extraction complete. Created ' + allExports.length + ' categories.');
