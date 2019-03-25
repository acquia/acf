# Acquia Commerce Framework
Contexual commerce experiences require  multiple modes of integration with the CMS. Acquia Commerce Framework (ACF) combines Drupal as the "glass" and a decoupled e-commerce platform to power the commerce engine. The optimal structure is composed of two different approaches:

1) Cacheable data imported into the CMS.
> *Example: product data is imported as content so site builders can manage it within the site..*

2) Realtime data managed via clientside JS components.
>*Example: add to cart  button sends the request to the ecommerce API, and the cart component is updated.*

ACF is a open-source reference architecture that allows Drupal developers, Javascript developers, and site builders to create these experiences quickly.

## Module Listing
- acf_blocks - Decoupled blocks for direct user iteraction with ecommerce APIs
- acf_catalog - Back end integration tool for importing "virtual catalogs" from ecommerce APIs
- acf_demo - Drupal-based technical implementation of ACF in practice
-- acf_demo_cart - Decoupled cart for calculating and displaying live data (uses acf_blocks)
-- acf_demo_product - Creates a product content type to be used for product display
-- acf_demo_api - Provides a mock API to be used for the demo (uses acf_catalog)

## Roadmap
No defined roadmap at this time. See the [TODO.md](TODO.md) docs in the module folders for a list of ideas and thoughts. Feel free to contribute back!

## Support
This project is a reference architecture similar to the `examples` module. It is not intended to be used directly. Use this to inform your architecture, and to experiment with your plans very quickly. See the partner connectors *(coming soon - Elastic Path, Big Commerce, Commerce Cloud)* for more specific examples of how best to connect to your ecommerce engine.

This code is provided as-is with no warranty or support. This is a community reference project! We hope this provides value to eeryone, but this is **not an official Acquia product**. Please feel free to share and contribute back.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Brant Wynn** - *ACF Catalog, ACF Demo* - [brantwynn](https://github.com/brantwynn)
* **Ron Northcutt** - *ACF Demo* - [rlnorthcutt](https://github.com/brantwynn)
* **Liliana Zbirciog** - *Project management* 
* **Andrei Perciun** - *ACF Blocks, ACF Demo* - [andreiperciun](https://github.com/andreiperciun)
* **Alexei Seremet** - *ACF Blocks* - [alexeiseremet](https://github.com/alexeiseremet)

See also the list of [contributors](https://github.com/acquia/acf/docs/6_Contributors.md) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details