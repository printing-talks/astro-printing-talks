import { readdir, stat } from 'fs/promises';
import { join, relative, parse } from 'path';
import { writeFile } from 'fs/promises';

const baseURL = 'https://www.printingtalks.ae'; // Replace with your site's base URL
const pagesDirectory = './src/pages'; // Adjust according to your project structure
const sitemapPath = './public/sitemap.xml';

async function getAllPageFiles(dir, filelist = []) {
  const files = await readdir(dir);
  for (const file of files) {
    const filepath = join(dir, file);
    if ((await stat(filepath)).isDirectory()) {
      filelist = await getAllPageFiles(filepath, filelist);
    } else if (/\.(astro|md|html)$/.test(file)) {
      let relativePath = relative(pagesDirectory, filepath).replace(/\\/g, '/');
      // Parse the file to remove the extension
      const parsedPath = parse(relativePath);
      relativePath = join(parsedPath.dir, parsedPath.name).replace(/\\/g, '/');

      // Special handling for index page
      if (relativePath === 'index') {
        relativePath = ''; // Set to base URL for index page
      }

      filelist.push(`${baseURL}/${relativePath}`);
    }
  }
  return filelist;
}

function generateSitemap(files) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  files.forEach(file => {
    xml += `  <url>\n    <loc>${file}</loc>\n  </url>\n`;
  });
  xml += '</urlset>\n';
  return xml;
}

async function main() {
  const files = await getAllPageFiles(pagesDirectory);
  const sitemap = generateSitemap(files);
  await writeFile(sitemapPath, sitemap);
  console.log(`Sitemap generated at ${sitemapPath}`);
}

main().catch(console.error);
