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
Kirby::plugin('editor/table-block', [
    'snippets' => [
        'editor/table' => __DIR__ . '/snippets/table.php'
    ]
]);

Kirby::plugin('editor/table-smt-block', [
    'snippets' => [
        'editor/table-smt' => __DIR__ . '/snippets/table.php'
    ]
]);

Kirby::plugin('editor/table-aio-block', [
    'snippets' => [
        'editor/table-aoi' => __DIR__ . '/snippets/table.php'
    ]
]);

// Kirby::plugin('editor/table-select-block', [
//     'snippets' => [
//         'editor/table-select' => __DIR__ . '/snippets/table.php'
//     ]
// ]);

Kirby::plugin('editor/table-kit-block', [
    'snippets' => [
        'editor/table-kit' => __DIR__ . '/snippets/table.php'
    ]
]);

Kirby::plugin('editor/table-pack-block', [
    'snippets' => [
        'editor/table-pack' => __DIR__ . '/snippets/table.php'
    ]
]);

Kirby::plugin('editor/table-cf8-block', [
    'snippets' => [
        'editor/table-cf8' => __DIR__ . '/snippets/table.php'
    ]
]);
