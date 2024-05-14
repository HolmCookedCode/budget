const birthdays = [
    {
        "id" : 1,
        "date" : "2024-05-14",
        "name" : "Todd"
    },
    {
        "id": 2,
        "date" : "2026-04-13",
        "name" : "BlimBlop"
    },
    {
        "id" : 3,
        "date" : "1942-03-07",
        "name" : "Pops"
    }
];

birthdays.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
});
console.log(birthdays);