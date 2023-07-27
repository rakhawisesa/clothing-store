// Code lama
// import './directory-item.styles.scss';

import {
    BackgroundImage,
    DirectoryItemBodyContainer,
    DirectoryItemContainer
} from "./directory-item.styles";

import {useNavigate} from 'react-router-dom';

const DirectoryItem = (props) => {
    const {imageUrl, title, route} = props.category;

    const navigate = useNavigate();
    const changeToDirectoryItemHandler = () => navigate(route);
    
    return (
        <DirectoryItemContainer onClick={changeToDirectoryItemHandler}>
            {/* 
                --- Code lama ---
                <div className="background-image" style={{
                    backgroundImage: `url(${imageUrl})`
                }}></div> 
            */}

            <BackgroundImage imageUrl={imageUrl}/>{/*
                --- Code dengan 'styled-components' ---
                Dengan menggunakan 'styled-components' kita dapat
                mengirim 'props' kedalam file 'styled-components',
                pada kasus diatas propsnya adalah 'imageUrl'
            */}

            <DirectoryItemBodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBodyContainer>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;