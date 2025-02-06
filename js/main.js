Vue.component('note', {
    props: ['card', 'columnIndex'],
    template: `
        <div class="note" :class="{ locked: card.locked }">
            <p class="title">{{ card.title }}</p>
            <ul>
                <li v-for="(item, index) in card.items" :key="index" class="anti-dots">
                    <input 
                        type="checkbox" 
                        :checked="item.completed" 
                        @change="toggleItem(index)" 
                        :disabled="card.locked"
                    />
                    {{ item.text }}
                </li>
            </ul>
            <p v-if="card.completedDate">Дата окончания: {{ card.completedDate }}</p>
        </div>
    `,
    methods: {
        toggleItem(index) {
            this.$emit('update-item', { cardIndex: this.card.index, itemIndex: index, columnIndex: this.columnIndex });
        }
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
            isColumnOneLocked: false
        };
    },

    methods: {
        addCard(columnIndex) {
            const newCard = {
                title: prompt('Введите заголовок:'),
                items: Array.from({ length: 4 }, () => ({
                    text: prompt('Введите пункт:'),
                    completed: false
                })),
                index: this.columns[columnIndex].cards.length,
                completedDate: null,
                locked: false
            };
            this.columns[columnIndex].cards.push(newCard);
        },
        updateItem(payload) {
            const { cardIndex, itemIndex, columnIndex } = payload;
            const card = this.columns[columnIndex].cards[cardIndex];
            card.items[itemIndex].completed = !card.items[itemIndex].completed;
            const completedCount = card.items.filter(item => item.completed).length;
            const totalItems = card.items.length;
            if (columnIndex === 0) {
                if (completedCount / totalItems > 0.5 && this.columns[1].cards.length < this.maxCardsInColumnTwo) {
                    this.moveCard(0, 1, cardIndex);
                } else if (completedCount === totalItems) {
                    this.moveCard(0, 2, cardIndex);
                }
            }
            if (columnIndex === 1 && completedCount === totalItems) {
                this.moveCard(1, 2, cardIndex);
            }
            this.checkLockState();
        },
        moveCard(fromColumn, toColumn, cardIndex) {
            const card = this.columns[fromColumn].cards.splice(cardIndex, 1)[0];
            card.completedDate = toColumn === 2 ? new Date().toLocaleString() : null;
            card.locked = false;
            this.columns[toColumn].cards.push(card);
            this.columns[toColumn].cards.forEach((c, i) => (c.index = i));
        },
        checkLockState() {
            if (this.columns[1].cards.length >= this.maxCardsInColumnTwo) {
                this.isColumnOneLocked = this.columns[0].cards.some(card =>
                    card.items.filter(item => item.completed).length / card.items.length > 0.5
                );
            } else {
                this.isColumnOneLocked = false;
            }
            this.columns[0].cards.forEach(card => (card.locked = this.isColumnOneLocked));
        }
    },
    template: `
        <div id="app">
            <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
                <h2>{{ column.title }}</h2>
                <note 
                    v-for="(card, cardIndex) in column.cards" 
                    :key="cardIndex" 
                    :card="card" 
                    :column-index="columnIndex"
                    @update-item="updateItem"
                ></note>
                <button 
                class="but"
                @click="addCard(columnIndex)" 
                :disabled="columnIndex === 1 && columns[1].cards.length >= maxCardsInColumnTwo" 
                :disabled="columnIndex === 0 && columns[0].cards.length >= maxCardsInColumnOne">
                    Добавить 
                </button>
            </div>
        </div>
    `
});