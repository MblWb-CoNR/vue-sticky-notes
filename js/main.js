new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { title: 'Три', cards: [] },
                { title: 'Пять', cards: [] },
                { title: 'Бесконечно', cards: [] }
            ]
        };
    },
    methods: {
    },
    template: `
        <div id="app">
            <div class="column">
                <h2>{{ column.title }}</h2>
            </div>
        </div>
    `
});