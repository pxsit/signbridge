import type { Story } from '../types';

export const stories: Story[] = [
    {
        id: 'story1',
        title: 'Morning Together',
        lines: [
            'Mum says wake up.',
            'We brush teeth and wash hands.',
            'Dad says go to school.',
            'Teacher says good job and thank you.',
        ],
        highlightedWords: [
            'Mum',
            'Wake Up',
            'Brush Teeth',
            'Wash Hands',
            'Go to School',
            'Teacher',
            'Good Job',
            'Thank You',
        ],
        questions: [
            { q: 'Who says wake up?', choices: ['Mum', 'Friend', 'Baby'], answer: 'Mum' },
            { q: 'What do we do before school?', choices: ['Play', 'Brush teeth', 'Sleep'], answer: 'Brush teeth' },
        ],
    },
    {
        id: 'story2',
        title: 'Playground Feelings',
        lines: [
            'Friend feels sad at first.',
            'Sister says play.',
            'Soon everyone feels happy and excited.',
            'We go home feeling proud.',
        ],
        highlightedWords: ['Friend', 'Sad', 'Sister', 'Play', 'Happy', 'Excited', 'Come Home', 'Proud'],
        questions: [
            { q: 'How did friend feel first?', choices: ['Sad', 'Happy', 'Angry'], answer: 'Sad' },
            { q: 'What did sister suggest?', choices: ['Sleep', 'Play', 'Sit'], answer: 'Play' },
        ],
    },
    {
        id: 'story3',
        title: 'Classroom Teamwork',
        lines: [
            'Teacher asks us to sit.',
            'Brother stands and asks for help.',
            'We listen and open the book.',
            'Grandparent says love and thank you.',
        ],
        highlightedWords: [
            'Teacher',
            'Sit',
            'Brother',
            'Stand',
            'Help',
            'Listen',
            'Book',
            'Grandparent',
            'Love',
            'Thank You',
        ],
        questions: [
            { q: 'Who asks for help?', choices: ['Brother', 'Dad', 'Baby'], answer: 'Brother' },
            { q: 'What do we open?', choices: ['Book', 'Door', 'Bag'], answer: 'Book' },
        ],
    },
];
