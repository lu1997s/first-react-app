import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import menuService from "../../services/menu.services"

const newMenuForm = () => {

    const [menuData, setMenuData] = useState({

        name: "menú 3",
        days: [{
            "day": "Monday",
            "recipeBreakfastId": "b79327d05b8e5b838ad6cfd9576b30b6",
            "recipeLunchId": "b79327d05b8e5b838ad6cfd9576b30b6",
            "recipeDinnerId": "b79327d05b8e5b838ad6cfd9576b30b6"
        },
        {
            "day": "Tuesday",
            "recipeBreakfastId": "b79327d05b8e5b838ad6cfd9576b30b6",
            "recipeLunchId": "b79327d05b8e5b838ad6cfd9576b30b6",
            "recipeDinnerId": "b79327d05b8e5b838ad6cfd9576b30b6"
        }
        ]

    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setMenuData({ ...menuData, [name]: value })
    }

    const handleDayChange = (index, field, value) => {
        const updatedDays = menuData.days.map((day, i) => {
            if (i === index) {
                return { ...day, [field]: value };
            }
            return day;
        });

        setMenuData({
            ...menuData,
            days: updatedDays,
        });
    };

    const handleMenuSubmit = e => {

        e.preventDefault()

        menuService
            .createMenu(menuData)
            .then((response) => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <div className="newMenuForm">
            <Form onSubmit={handleMenuSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Menu name</Form.Label>
                    <Form.Control type="text" value={menuData.name} name="name" onChange={handleInputChange} />
                </Form.Group>
                {menuData.days.map((day, index) => (
                    <div key={index}>
                        <h5>{day.day}</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Breakfast Recipe ID</Form.Label>
                            <Form.Control type="text" value={day.recipeBreakfastId} onChange={(e) => handleDayChange(index, 'recipeBreakfastId', e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lunch Recipe ID</Form.Label>
                            <Form.Control type="text" value={day.recipeLunchId} onChange={(e) => handleDayChange(index, 'recipeLunchId', e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dinner Recipe ID</Form.Label>
                            <Form.Control type="text" value={day.recipeDinnerId} onChange={(e) => handleDayChange(index, 'recipeDinnerId', e.target.value)} />
                        </Form.Group>
                    </div>
                ))}
                <div className="d-grid">
                    <Button variant="dark" type="submit">Crear menú</Button>
                </div>
            </Form>
        </div>
    )
}

export default newMenuForm





