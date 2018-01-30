import { cloth, weapon, shoes, defaultRole } from './config';

// 基础角色
var Role = function(role) {
    this.hp = role.hp;
    this.atk = role.atk;
    this.speed = role.speed;
    this.cloth = role.cloth;
    this.weapon = role.weapon;
    this.shoes = role.shoes;
}
Role.prototype = {
    constructor: Role,
    run: function() {},
    attack: function() {}
    // ...
}

var Soldier = function(roleInfo) {
    var o = Object.assign({}, defaultRole, roleInfo);
    Role.call(this, o);
    this.nickname = o.nickname;
    this.gender = o.gender;
    this.career = '战士';
    if (roleInfo.hp == defaultRole.hp) {
        this.hp = defaultRole.hp + 20;
    }
    if (roleInfo.speed == defaultRole.speed) {
        this.speed = defaultRole.speed + 5;
    }
}
Soldier.prototype = Object.create(Role.prototype, {
    constructor: {
        value: Soldier,
    },
    run: {
        value: function() {
            console.log('战士的奔跑动作');
        },
    },
    attack: {
        value: function() {
            console.log('战士的基础攻击');
        }
    }
    // ...
})

// var Mage = function(nickname, gender) {
//     ...
// }

var Decorator = function(role) {
    this.role = role;
    this.hp = role.hp;
    this.atk = role.atk;
    this.speed = role.speed;
    this.cloth = role.cloth;
    this.weapon = role.weapon;
    this.shoes = role.shoes;
    this.career = role.career;
    this.gender = role.gender;
    this.nickname = role.nickname;
}

Decorator.prototype = {
    constructor: Decorator,
    run: function() {
        this.role.run();
    },
    attack: function() {
        this.role.attack();
    }
    // ...
}

var ClothDecorator = function(role, cloth) {
    Decorator.call(this, role);
    this.cloth = cloth.name;
    this.hp += cloth.hp;
}

var WeaponDecorator = function(role, weapon) {
    Decorator.call(this, role);
    this.weapon = weapon.name;
    this.atk += weapon.attack;
}
WeaponDecorator.prototype = Object.create(Decorator.prototype, {
    constructor: {
        value: WeaponDecorator
    },
    attack: {
        value: function() {
            console.log('装备了武器，攻击变得更强了');
        }
    }
})

var ShoesDecorator = function(role, shoes) {
    Decorator.call(this, role);
    this.shoes = shoes.name;
    this.speed += shoes.speed;
}
ShoesDecorator.prototype = Object.create(Decorator.prototype, {
    constructor: {
        value: ShoesDecorator
    },
    run: {
        value: function() {
            console.log('穿上了鞋子，奔跑速度更快了');
        }
    }
})

var base = {
    ...defaultRole,
    nickname: 'alex',
    gender: 'man'
}
var alex = new Soldier(base);
alex.run();
alex.attack();
console.log(alex);

console.log('                  ');
console.log('------装备衣服-----');
alex = new ClothDecorator(alex, cloth);
console.log(alex);

console.log('                  ');
console.log('------装备武器-----');
alex = new WeaponDecorator(alex, weapon);
alex.attack();
console.log(alex);


console.log('                  ');
console.log('------装备鞋子-----');
alex = new ShoesDecorator(alex, shoes);
alex.run();
console.log(alex);
