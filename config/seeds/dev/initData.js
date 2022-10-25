exports.seed = function (knex) {
    return Promise.all([
        knex('ubers').del(),
        knex('bookings').del(),
        knex('ubers').insert({
                id: 'c804a85c-a230-437b-85db-8cd61b2819f9'
            }
        )
    ]);
}