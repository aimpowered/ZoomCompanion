"use client";
import React, { useState, useEffect } from 'react';
import Header from '../header';
import Footer from '../footer';
import Modal from 'react-modal';
import { affirmations } from '../state';


interface Button {
  id: number;
  text: string;
}

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const initialButtons: Button[] = [
    { id: 1, text: 'Say what I want to say, whatever happens will help me grow' },
    { id: 2, text: 'I can take up space' },
    { id: 3, text: 'I have an important voice' },
    { id: 4, text: 'Feel the tension and proceed' },
    { id: 5, text: 'I have the right to stutter' },
  ];

  // Initialize state with saved data if it exists, otherwise use the initial data.
  const [buttons, setButtons] = useState<Button[]>(() => {
    const stringifiedAffirmations = affirmations.getAffirmationsAsString();
    return stringifiedAffirmations ? JSON.parse(stringifiedAffirmations) : initialButtons;
  });

  useEffect(() => {
    affirmations.setAffirmationsAsString(JSON.stringify(buttons));
  }, [buttons]);

  const openModal = (button: Button) => {
    setModalIsOpen(true);
    setCurrentEditId(button.id);
    setEditText(button.text);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = () => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === currentEditId ? { ...button, text: editText } : button
      )
    );
    console.log(buttons);
    closeModal();
  };

  const deleteButton = (id: number) => {
    setButtons((prevButtons) => prevButtons.filter((button) => button.id !== id));
  };

  const addButton = () => {
    const newId = Math.max(0, ...buttons.map((b) => b.id)) + 1; // Create a new ID
    const newButton: Button = { id: newId, text: '' };
    setButtons((prevButtons) => [...prevButtons, newButton]);
    setModalIsOpen(true);
    setCurrentEditId(newId);
  };

  // const saveAffirmation = (text: string) => {
  //   affirmations.setCurrentAffirmation(text);
  // };

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header />
      </div>

      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}>Affirmation</h2>
        <button
          style={{ border: 'none', display: 'inline-block', fontSize: '24px', padding: '10px' }}
          onClick={addButton}
          data-testid="add-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#f7f3f3" stroke="none" />
            <line x1="30" y1="50" x2="70" y2="50" stroke="#d68071" strokeWidth="8" />
            <line x1="50" y1="30" x2="50" y2="70" stroke="#d68071" strokeWidth="8" />
          </svg>
        </button>
      </div>

      {buttons.map((button) => (
        <div key={button.id} className="dropdown">
          <button className="dots-button"> {button.text}</button>
          <div className="dropdown-content">
            <button style={{ border: '0.5px solid black' }} onClick={() => affirmations.setCurrentAffirmation(button.text)}>
              Apply
            </button>
            <button style={{ border: '0.5px solid black' }} onClick={() => openModal(button)}>
              Edit
            </button>
            <button style={{ border: '0.5px solid black' }} onClick={() => deleteButton(button.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Button Text"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div className="Modal-Body">
          <textarea
            placeholder="Edit text"
            className="large-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleEdit}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <Footer />
    </div>
  );
}

export default Home;
