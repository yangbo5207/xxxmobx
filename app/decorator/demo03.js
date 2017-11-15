import { someCloth, someWeapon, someShoes, defaultRoleInfo } from './config';
import { ClothDecorator, WeaponDecorator, ShoesDecorator } from './equip';

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

@ClothDecorator
@WeaponDecorator
@ShoesDecorator
class Soldier extends Role {
    constructor(roleInfo) {
        const o = Object.assign({}, defaultRoleInfo, roleInfo);
        super(o);
        this.nickname = roleInfo.nickname;
        this.gender = roleInfo.gender;
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

const baseInfo = {
    ...defaultRoleInfo,
    nickname: 'alex',
    gender: 'man'
}

const s = new Soldier(baseInfo);
s.getCloth(someCloth);
console.log(s);

s.getWeapon(someWeapon);
s.attack();
console.log(s);

s.getShoes(someShoes);
s.run();
console.log(s);
