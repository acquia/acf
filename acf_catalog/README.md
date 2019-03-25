# ACF Catalog
The ACF Catalog module allows you to create "virtual catalogs" of data that can be mapped to content types. This provides a very clear and easy way to import content using a plugin-based architecture. This also allows us to use multiple plugins and "catalogs" to the same or different systems.

## When to use
ACF Catalog is a method for quickly and easily defining connections and importing product data as content. It is an early release with much left to potentially do. 

If you have a smaller set of product data, or are importing with less frequency, then you may be able to use `acf_catalog` in your project as it is! Much of the potential logic and specific coding can be done with a plugin.

However, if you have large data sets or require frequent updates, then you may want to look at using Migrate API to manage the syncing. This is the "traditional" method, and is widely supported. It can be a bit more effort to get the initial Migrate scripts set up, but it is reliable

Over time, we hope to extend and test `acf_catalog` to have more clear guidelines on when and how it is recommended.

## Non-commerce
Please note that while this is intended for use with ecommerce systems, it is not intrinsically specific to ecommerce. This can potentially create connections to any data set via an API, and pull it into the site.

## Creating your own plugin and connector
More details coming soon. For now, look at teh `acf_demo` module as a guide.