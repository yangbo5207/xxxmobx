import { someCloth, someWeapon, someShoes, defaultRoleInfo } from './config';

// 基础角色
class Role {
    constructor(roleInfo) {
        this.hp = roleInfo.hp;
        this.atk = roleInfo.atk;
        this.speed = roleInfo.speed;
        this.cloth = roleInfo.cloth;
        this.weapon = roleInfo.weapon;
        this.shoes = roleInfo.shoes;
    }
    run() {}
    attack() {}
}

class Soldier extends Role {
    constructor(roleInfo) {
        const o = Object.assign({}, defaultRoleInfo, roleInfo);
        super(o);
        this.nickname = o.nickname;
        this.gender = o.gender;
        this.career = '战士';
        if (roleInfo.hp == defaultRoleInfo.hp) {
            this.hp = defaultRoleInfo.hp + 20;
        }
        if (roleInfo.speed == defaultRoleInfo.speed) {
            this.speed = defaultRoleInfo.speed + 5;
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
    run() {}
    attack() {}
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
    ...defaultRoleInfo,
    nickname: 'alex',
    gender: 'man'
}

let alex = new Soldier(baseInfo);
alex.run();
alex.attack();
console.log(alex);

console.log('                  ');
console.log('------装备衣服-----');
alex = new ClothDecorator(alex, someCloth);
console.log(alex);

console.log('                  ');
console.log('------装备武器-----');
alex = new WeaponDecorator(alex, someWeapon);
alex.attack();
console.log(alex);


console.log('                  ');
console.log('------装备鞋子-----');
alex = new ShoesDecorator(alex, someShoes);
alex.run();
console.log(alex);
