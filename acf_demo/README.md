## Demo Usage Instructions

Add module suite to your project `composer require acquia/acf` - the default stable version should resolve.

Build or rebuild the composer project using `composer install` or `composer update` depending on your situation.

Once the acf contrib package is in your docroot/modules/contrib directory, you're good to go.

Install the `ACF Demo` module to get a `simple_api` and SFCC connections with basic data.

`drush en acf_demo`

Log in to the site and confirm the modules are installed.

Now and visit `/admin/structure/catalog` to manage your ACF catalogs.

There should be one Catalog installed thanks to `acf_demo` module.

Simple API Products - This catalog uses a connection that is local. It is looking at `/sites/default/files/acf_demo/simple_products.json` - a file that was placed in your `sites/default/files` by the `acf_demo` module when it was installed.

You can select the `'Import'` action under the operations for either catalog. Confirm `'Yes, Run The Import'` and wait for the batch process.

## Demo theme
You don't need this theme, but it will make the demo a bit prettier and more fun.

https://github.com/acquia/acf-demo-theme
