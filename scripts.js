//Storymaker class
class Storymaker {
    constructor() {
        this.animals = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit'];
        this.actions = ['jumps', 'runs', 'flies', 'sleeps', 'swims'];
        this.places = ['in the park', 'at the beach', 'in the house', 'on the street', 'in the garden'];
        this.colors = ['red', 'blue', 'green', 'yellow', 'purple'];
        this.items = ['ball', 'hat', 'stick', 'toy', 'book'];
        this.selections = ["None", "None", "None", "None", "None"];
    }

    cycleChoice(index, array, spanId) {
        //Cycle through the choices for a given index
        this.selections[index] = array[(array.indexOf(this.selections[index]) + 1) % array.length];
        document.getElementById(spanId).textContent = this.selections[index];
    }

    generateStory() {
        //Generate the final story based on user selections
        return `${this.selections[0]} ${this.selections[1]} ${this.selections[2]} with a ${this.selections[3]} ${this.selections[4]}.`;
    }

    resetSelections() {
        //Reset all selections to "None"
        this.selections = ["None", "None", "None", "None", "None"];
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`selected${i}`).textContent = 'None';
        }
        document.getElementById('storyOutput').textContent = '';
    }

    generateRandomStory() {
        //enerate a random story
        this.selections = [
            this.animals[Math.floor(Math.random() * this.animals.length)],
            this.actions[Math.floor(Math.random() * this.actions.length)],
            this.places[Math.floor(Math.random() * this.places.length)],
            this.colors[Math.floor(Math.random() * this.colors.length)],
            this.items[Math.floor(Math.random() * this.items.length)]
        ];
        for (let i = 0; i < this.selections.length; i++) {
            document.getElementById(`selected${i + 1}`).textContent = this.selections[i];
        }
        return this.generateStory();
    }
}

//Instantiate the Storymaker class
const storymaker = new Storymaker();

// Event listeners
document.getElementById('word1').addEventListener('click', () => storymaker.cycleChoice(0, storymaker.animals, 'selected1'));
document.getElementById('word2').addEventListener('click', () => storymaker.cycleChoice(1, storymaker.actions, 'selected2'));
document.getElementById('word3').addEventListener('click', () => storymaker.cycleChoice(2, storymaker.places, 'selected3'));
document.getElementById('word4').addEventListener('click', () => storymaker.cycleChoice(3, storymaker.colors, 'selected4'));
document.getElementById('word5').addEventListener('click', () => storymaker.cycleChoice(4, storymaker.items, 'selected5'));

document.getElementById('generateStory').addEventListener('click', () => {
    const story = storymaker.generateStory();
    document.getElementById('storyOutput').textContent = story;
    speakStory(story);//Call to read story aloud
});

document.getElementById('reset').addEventListener('click', () => storymaker.resetSelections());

document.getElementById('randomStory').addEventListener('click', () => {
    const story = storymaker.generateRandomStory();
    document.getElementById('storyOutput').textContent = story;
    speakStory(story);//Call to read random story aloud
});

//Function to read the story aloud
function speakStory(story) {
    const speech = new SpeechSynthesisUtterance(story);
    window.speechSynthesis.speak(speech);
}
