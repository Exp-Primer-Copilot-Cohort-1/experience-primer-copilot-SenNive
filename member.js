function skillMember() {
    console.log('skillMember');
    var member = {
        name: 'John',
        age: 26,
        job: 'teacher',
        presentation: function (style, timeOfDay) {
            if (style === 'formal') {
                console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
            } else if (style === 'friendly') {
                console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
            }
        }
    };
    var emily = {
        name: 'Emily',
        age: 35,
        job: 'designer'
    };
    member.presentation('formal', 'morning');
    member.presentation.call(emily, 'friendly', 'afternoon');
    // member.presentation.apply(emily, ['friendly', 'afternoon']);

    var johnFriendly = member.presentation.bind(member, 'friendly');
    johnFriendly('morning');
    johnFriendly('night');

    var emilyFormal = member.presentation.bind(emily, 'formal');
    emilyFormal('afternoon');

    var years = [1990, 1965, 1937, 2005, 1998];

    function arrayCalc(arr, fn) {
        var arrRes = [];
        for (var i = 0; i < arr.length; i++) {
            arrRes.push(fn(arr[i]));
        }
        return arrRes;
    }

    function calculateAge(el) {
        return 2016 - el;
    }

    function isFullAge(limit, el) {
        return el >= limit;
    }

    var ages = arrayCalc(years, calculateAge);
    var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
    console.log(ages);
    console.log(fullJapan);
}