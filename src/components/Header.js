import React from 'react'
import '../styles/Header.css'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
    return (
        <div className='headerContainer'>
            <div className='headerLeft'>
                <div className='iconStyle'>
                    <MaterialCommunityIcons name="alpha-a-box-outline" size={30} color="black" />
                </div>
                <div className='titleAndMenuStyle'>
                    <div className='titleStyles'>
                        Assignment
                    </div>
                    <div className='menuStyle'>
                        <div className='menuItemsStyle'>
                            new
                        </div>
                        <div>
                            |
                        </div>
                        <div className='menuItemsStyle'>
                            past
                        </div>
                        <div>
                            |
                        </div>
                        <div className='menuItemsStyle'>
                            comments
                        </div>
                        <div>
                            |
                        </div>
                        <div className='menuItemsStyle'>
                            ask
                        </div>
                        <div>
                            |
                        </div>
                        <div className='menuItemsStyle'>
                            show
                        </div>
                        <div>
                            |
                        </div>
                        <div className='menuItemsStyle'>
                            jobs
                        </div>
                        <div>
                            |
                        </div>
                        <div className='menuItemsStyle'>
                            submit
                        </div>
                    </div>
                </div>
            </div>
            <div className='loginStyle'>
                login
            </div>
        </div>
    )
}
