import React from "react";
import '../Styles/home.css'
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardTitle
} from 'reactstrap'

function FoodItemCard(fooditem) { 
    return (
        <Card className="foodCard" key={fooditem._id}>
            <CardImg className="foodImage" src={fooditem.image} alt={fooditem.item} />
            <CardBody className="CardBody text-center">
                <CardTitle className="text-center" tag="h5">{fooditem.item}</CardTitle>
                <CardTitle className="text-center" tag="h5">Price: {fooditem.price}</CardTitle>
                <CardSubtitle className="text-center mb-2 text-muted" tag="h6">{fooditem.cuisine}</CardSubtitle>
            </CardBody>
        </Card>
    )
}

export default FoodItemCard;
