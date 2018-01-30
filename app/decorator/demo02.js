import { cloth, weapon, shoes, defaultRole } from './config';

// 基础角色
class Role {
    constructor(role) {
        this.hp = role.hp;
        this.atk = role.atk;
        this.speed = role.speed;
        this.cloth = role.cloth;
        this.weapon = role.weapon;
        this.shoes = role.shoes;
    }
    run() {}
    attack() {}
}

class Soldier extends Role {
    constructor(roleInfo) {
        const o = Object.assign({}, defaultRole, roleInfo);
        super(o);
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
    run() {
        console.log('战士的奔跑动作');
    }
    attack() {
        console.log('战士的基础攻击');
    }
}

// class Mage extends Role {}

class Decorator {
    constructor(role) {
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
    run() { this.role.run(); }
    attack() { this.role.attack() }
}

class ClothDecorator extends Decorator {
    constructor(role, cloth) {
        super(role);
        this.cloth = cloth.name;
        this.hp += cloth.hp;
    }
}

class WeaponDecorator extends Decorator {
    constructor(role, weapon) {
        super(role);
        this.weapon = weapon.name;
        this.atk += weapon.attack;
    }
    attack() {
        console.log('装备了武器，攻击变得更强了');
    }
}

class ShoesDecorator extends Decorator {
    constructor(role, shoes) {
        super(role);
        this.shoes = shoes.name;
        this.speed += shoes.speed;
    }
    run() {
        console.log('穿上了鞋子，奔跑速度更快了');
    }
}


const baseInfo = {
    ...defaultRole,
    nickname: 'alex',
    gender: 'man'
}

let alex = new Soldier(baseInfo);
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
