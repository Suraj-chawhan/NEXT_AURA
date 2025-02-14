import React from 'react';

const Gamebox = () => {
    // An array of card data
    const cardData = [
        { id: 1, image: '/Images/flipcard.jpg', title: 'Card Title 1', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
        { id: 2, image: '/Images/quizgame.jpg', title: 'Card Title 2', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
        { id: 3, image: '/Images/chatbot.jpg', title: 'Card Title 3', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    ];

    return (
        <div className="container px-20 py-10">
            <div className="flex justify-between items-center ">
                {cardData.map((card) => (
                    <div className="col-md-4" key={card.id}>
                        <div className="card" style={{ width: "18rem", height: "25rem" }}>
                            <img src={card.image} className="card-img-top" alt={card.title} style={{ width: "100%", height: "60%", objectFit: "cover" }} />
                            <div className="card-body" style={{ height: "40%" }}>
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.content}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gamebox;
