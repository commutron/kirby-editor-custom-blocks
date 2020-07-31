<table>
    <tr>
        <?php foreach ($attrs->columns()->value() as $column): ?>
        <th>
            <?= $column['label'] ?>
        </th>
        <?php endforeach ?>
    </tr>
    <?php foreach ($attrs->rows()->value() as $row): ?>
    <tr>
        <?php foreach ($attrs->columns()->value() as $index => $column): ?>
        <td>
            <?= $row[$index] ?>
        </td>
        <?php endforeach ?>
    </tr>
    <?php endforeach ?>
</table>
