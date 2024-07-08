import fs from 'fs';
import path from 'path';
import type { Resource } from 'fhir/r5';
import { Index } from './index';
import type { FileMeta } from './index';

const args = process.argv.slice(2);

if(args.length !== 2) { 
    console.error('Usage: bun scripts/package.ts <inputDir> <outputDir>');
    process.exit(1);
}

const inputDir = args[0];
const outputDir = args[1];

const files = fs.readdirSync(inputDir, { recursive: true }).map(file => file as string).filter(x => x != null);
const jsonFiles = files.filter(file => path.extname(file) === '.json').filter(file => path.basename(file, ".json") !== 'cqf-tooling');

var fileMetas = new Array<FileMeta>();

// Read each JSON file and add it to the index entry
jsonFiles.forEach(file => {
    const data = fs.readFileSync(path.join(inputDir, file), 'utf8');
    const json = JSON.parse(data);
    const resource = json as Resource;

    if (resource == null) {
        return;
    }

    const canon = resource as any;

    fileMetas.push({
        filename:  path.basename(file),
        resourceType: resource.resourceType,
        id: resource.id,
        version: canon.version?.toString(),
        url: canon.url?.toString(),
        kind: undefined,
        type: undefined
    });

    fs.copyFileSync(path.join(inputDir, file), path.join(outputDir, path.basename(file)));
});

const index = new Index(1, fileMetas);
fs.writeFileSync(path.join(outputDir, '.index.json'), JSON.stringify(index, null, 2));