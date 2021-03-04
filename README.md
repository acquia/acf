# Acquia Commerce Framework
Composable commerce experiences require  multiple modes of integration with the CMS. Acquia Commerce Framework (ACF) combines Drupal as the "glass" and a decoupled e-commerce platform to power the commerce engine. The optimal structure is composed of two different approaches:

1) Cacheable data imported into the CMS.
> *Example: product data is imported as content so site builders can manage it within the site..*

2) Realtime data managed via clientside JS components.
>*Example: add to cart  button sends the request to the ecommerce API, and the cart component is updated.*

ACF is an open-source reference architecture that allows Drupal developers, Javascript developers, and site builders to create these experiences quickly.

# Demo video
[![](http://img.youtube.com/vi/OWGu1FSzWLU/0.jpg)](http://www.youtube.com/watch?v=OWGu1FSzWLU "Acquia Commerce Framework Demo")

## Module Listing


## Roadmap
No defined roadmap at this time. See the [TODO.md](TODO.md) docs in the module folders for a list of ideas and thoughts. Feel free to contribute back!

## Support
This project is a reference architecture similar to the `examples` module. It is not intended to be used directly. Use this to inform your architecture, and to experiment with your plans very quickly. See the [external connectors document](docs/7_External_connectors.md) for more specific examples of how best to connect to your ecommerce engine.

This code is provided as-is with no warranty. This is a community reference project! We hope this provides value to everyone, but this is **not an official Acquia product**. Please feel free to share and contribute back.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

See also the list of [contributors](https://github.com/acquia/acf/blob/master/docs/6_Contributors.md) who participated in this project.

## Copyright and license

Copyright © 2021 Acquia Inc.

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
