import React from 'react'

export default props => (
    <li className='treeview'>
        <a href="#">
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
            <div className='pull-right-container'>
                <i className='fa fa-angle-left pull-right'></i>
            </div>
        </a>
        <ul className='treeview-menu'>
            {props.children}
        </ul>
    </li>
)
