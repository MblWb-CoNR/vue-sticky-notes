new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { title: 'Три', cards: [] },
                { title: 'Пять', cards: [] },
                { title: 'Бесконечно', cards: [] }
            ],
            maxCardsInColumnOne: 3,
            maxCardsInColumnTwo: 5,
        };
    },
    methods: {
    },
    template: `
        <div id="app">
            <div v-for="column in columns" class="column">
                <h2>{{ column.title }}</h2>
            </div>
        </div>
    `
});