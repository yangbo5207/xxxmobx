import { cloth, weapon, shoes, defaultRole } from './config';
import { ClothDecorator, WeaponDecorator, ShoesDecorator } from './equip';

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

@ClothDecorator
@WeaponDecorator
@ShoesDecorator
class Soldier extends Role {
    constructor(roleInfo) {
        const o = Object.assign({}, defaultRole, roleInfo);
        super(o);
        this.nickname = roleInfo.nickname;
        this.gender = roleInfo.gender;
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

const baseInfo = {
    ...defaultRole,
    nickname: 'alex',
    gender: 'man'
}

const s = new Soldier(baseInfo);
s.getCloth(cloth);
console.log(s);

s.getWeapon(weapon);
s.attack();
console.log(s);

s.getShoes(shoes);
s.run();
console.log(s);
