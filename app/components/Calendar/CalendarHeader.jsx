import React from 'react';

export default function() {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    return (
        <div className="weekday">
            {days.map((item, i) => <div key={i}>{item}</div>)}
        </div>
    )
}
