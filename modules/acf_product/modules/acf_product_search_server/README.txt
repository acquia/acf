CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Recommended modules
 * Installation
 * Configuration


INTRODUCTION
------------

ACF Product Search Server provides the optional database server configuration
for Search API DB. For some reason, the configuration is not installed during a
normal site install, so we are using hook_install if the configuration does not
already exist. Because ACF Product Search requires the optional database server
configuration, ACF Product Search Server needs to be installed first since
hook_install runs after config install.


REQUIREMENTS
------------

This module requires the following modules:

 * ACF Product (https://github.com/acquia/acf)
 * Search API (https://www.drupal.org/project/search_api)
 * Search API DB (https://www.drupal.org/project/search_api)


INSTALLATION
------------

 * Install as you would normally install a contributed Drupal module.
   See: https://www.drupal.org/node/895232 for further information.


CONFIGURATION
-------------

No configuration is needed.

