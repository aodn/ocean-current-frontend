export * from './withIcon';
export * from './products';
export * from './ui';
export * from './legends';

/**
 * The PowerShell command to change all svg's fill to 'currentColor'
 * Get-ChildItem -Recurse -Filter *.svg | ForEach-Object {
    (Get-Content $_.FullName) -replace 'fill="[^"]*"', 'fill="currentColor"' | Set-Content $_.FullName
}

Mac/Linux command:
find ./src/assets/icons/products -type f -name "*.svg" -exec sed -i '' 's/fill="[^"]*"/fill="currentColor"/g' {} +
*/
