Vue.component('note', {
    props: ['card', 'columnIndex'],
    template: `   
    `,
    methods: {
    }
});

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
        addCard(columnIndex) {
            if (columnIndex === 0 && this.columns[0].cards.length >= this.maxCardsInColumnOne) {
                alert('Первая колонка уже заполнена.');
                return;
            }
            if (columnIndex === 1 && this.columns[1].cards.length >= this.maxCardsInColumnTwo) {
                alert('Вторая колонка уже заполнена.');
                return;
            }
        },
    },
    template: `
        <div id="app">
            <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
                <h2>{{ column.title }}</h2>
            </div>
        </div>
    `
});