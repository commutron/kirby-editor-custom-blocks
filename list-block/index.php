<?php

/**
 * A block component should define a
 * matching snippet for the `blocks` field method.
 *
 * The snippet name must follow the scheme `editor/$type`
 *
 * If no snippet is defined, the block will be skipped when
 * the HTML is rendered in the template. This can be used
 * for block types that are only visible in the backend.
 */
Kirby::plugin('konstellation/list-block', [
    'snippets' => [
        'editor/list' => __DIR__ . '/snippets/list.php'
    ]
]);
