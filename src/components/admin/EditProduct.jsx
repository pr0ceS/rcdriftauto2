import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsEdit } from "../../slices/productsSlice";

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from "@tiptap/extension-document"
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Select } from "@mui/material";


export default function EditProduct({ prodId }) {
  const [open, setOpen] = useState(false);
  const { items } = useSelector((state) => state.products);
  const editorRef = useRef()

  const dispatch = useDispatch();
  const { editStatus } = useSelector((state) => state.products);

  const [previewImg, setPreviewImg] = useState("");
  const [currentProd, setCurrentProd] = useState({});

  const [productImg, setProductImg] = useState([]);
	const [inputs, setInputs] = useState([]);
	// const [brand, setBrand] = useState("");
	const [name, setName] = useState("");
  const [productId, setProductId] = useState("");
	const [desc, setDesc] = useState("");
	const [price, setPrice] = useState(0);
	const [tax, setTax] = useState(0);
	const [sale, setSale] = useState(0);
	const [stock, setStock] = useState(1);
	const [PN, setPN] = useState("");
	const [EAN, setEAN] = useState("");
	const [deliveryTime, setDeliveryTime] = useState("");
	const [color, setColor] = useState("");
	const [category, setCategory] = useState([]);
	const [condition, setCondition] = useState("");
	const [ranking, setRanking] = useState("");
	const [soldOut, setSoldOut] = useState(false);

	// const handleInputChange = (e, index) => {
	// 	const newInputs = inputs.map(input => {
	// 		if (input.key === key) {
	// 			return {
	// 				...input,
	// 				value: event.target.value
	// 			}
	// 		}
	// 		return input;
	// 	});
	// 	setInputs(newInputs);
	// 	const newInputData = inputs.map(input => {
	// 		return input.value;
	// 	});

	// 	setDesc(newInputData);
	// }

  const handleProductImageUpload = (e) => {
		const file = e.target.files;

		if (file) {
			setProductImg([]);
			Object.entries(file).map(image => {
				let reader = new FileReader();
				reader.readAsDataURL(image[1]);
				reader.onloadend = () => {
					setProductImg(productImg => [...productImg, reader.result]);
				};
			});
		} else {
			setProductImg("");
		}
	};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const html = editor.getHTML()

    try {
    if(html) {
      dispatch(
        productsEdit({
          productId,
          name,
          desc: html,
          price,
          image: productImg,
          tax,
          sale,
          stock,
          PN,
          EAN,
          deliveryTime,
          color,
        })
      );
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const MenuBar = ({ editor }) => {
		if (!editor) {
			return null
		}

		return (
			<>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.toggleBold()
							.run()
					}
					className={editor.isActive('bold') ? 'is-active' : ''}
				>
					bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.toggleItalic()
							.run()
					}
					className={editor.isActive('italic') ? 'is-active' : ''}
				>
					italic
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.toggleStrike()
							.run()
					}
					className={editor.isActive('strike') ? 'is-active' : ''}
				>
					strike
				</button>
				<button
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.toggleCode()
							.run()
					}
					className={editor.isActive('code') ? 'is-active' : ''}
				>
					code
				</button>
				<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
					clear marks
				</button>
				<button onClick={() => editor.chain().focus().clearNodes().run()}>
					clear nodes
				</button>
				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive('paragraph') ? 'is-active' : ''}
				>
					paragraph
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
				>
					h1
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
				>
					h2
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
				>
					h3
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
				>
					h4
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
					className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
				>
					h5
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
					className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
				>
					h6
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
				>
					bullet list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive('orderedList') ? 'is-active' : ''}
				>
					ordered list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={editor.isActive('codeBlock') ? 'is-active' : ''}
				>
					code block
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'is-active' : ''}
				>
					blockquote
				</button>
				<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
					horizontal rule
				</button>
				<button onClick={() => editor.chain().focus().setHardBreak().run()}>
					hard break
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.undo()
							.run()
					}
				>
					undo
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.redo()
							.run()
					}
				>
					redo
				</button>
				<button
					onClick={() => editor.chain().focus().setColor('#958DF1').run()}
					className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
				>
					purple
				</button>
			</>
		)
	}

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
			Document,
			Image,
			Dropcursor
    ],
    content: `<h1>test</h1>`
  })

	const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProd = items.filter((item) => item._id === prodId);

    selectedProd = selectedProd[0];
    setProductId(selectedProd._id);
    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image[0]);
    setProductImg(selectedProd.image);
    setName(selectedProd.name);
    setDesc(selectedProd.desc);
    setPrice(selectedProd.price);
		setTax(selectedProd.tax ? selectedProd.tax : 0);
    setSale(selectedProd.sale ? selectedProd.sale : 0);
		setStock(selectedProd.stock ? selectedProd.stock : 0);
		setPN(selectedProd.PN ? selectedProd.PN : "");
		setEAN(selectedProd.EAN ? selectedProd.EAN : "");
		setDeliveryTime(selectedProd.deliveryTime ? selectedProd.deliveryTime : 0);
		setColor(selectedProd.color ? selectedProd.color : null);
		setCategory(selectedProd.category ? selectedProd.category : null);
		setCondition(selectedProd.condition ? selectedProd.condition : "");
		setRanking(selectedProd.ranking ? selectedProd.ranking : "");
		setSoldOut(selectedProd.soldOut ? selectedProd.soldOut : false);

    editor.commands.setContent(selectedProd.desc);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Bewerk</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>Bewerk Product</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Bewerk Product</h3>
              <input
                id="imgUpload"
                accept="image/*"
                type="file"
                onChange={handleProductImageUpload}
                multiple
              />
              {/* <select
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                required
              >
                <option value="">Selecteer Kleur</option>
                <option value="groen">Groen</option>
                <option value="rood">Rood</option>
                <option value="blauw">Blauw</option>

              </select> */}
              <label>Titel:</label>
              <input
                type="text"
                placeholder="Titel"
                value={name ? name : ""}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="editor">
                <button onClick={addImage}>add image from URL</button>
                <MenuBar className="menubar" editor={editor}/>
                <EditorContent className="editorcontent" editor={editor}/>
              </div>
              <label>Prijs inclusief BTW:</label>
              <input
                type="number"
                placeholder="Prijs Inclusief BTW"
                value={price ? price : 0}
                onChange={(e) => setPrice(e.target.value)}
                step=".01"
                required
              />
              <label>Oude prijs (afgeprijsd):</label>
              <input
                type="number"
                placeholder="Oude prijs (afgeprijsd)"
                value={sale ? sale : 0}
                onChange={(e) => setSale(e.target.value)}
                required
              />
              <label>Voorraad:</label>
              <input
                type="number"
                placeholder="Voorraad"
                value={stock ? stock : 0}
                onChange={(e) => setStock(e.target.value)}
              />
              <label>Percentage BTW:</label>
              <input
                type="number"
                placeholder="Percentage BTW"
                value={tax ? tax : 0}
                onChange={(e) => setTax(e.target.value)}
              />
              <label>PN (45-241-026):</label>
              <input
                type="text"
                placeholder="PN (45-241-026)"
                value={PN ? PN : ""}
                onChange={(e) => setPN(e.target.value)}
              />
              <label>EAN (4260218663152):</label>
              <input
                type="text"
                placeholder="EAN (4260218663152)"
                value={EAN ? EAN : ""}
                onChange={(e) => setEAN(e.target.value)}
              />
              <label>Selecteer dagen tot levering:</label>
              <select onChange={(e) => setDeliveryTime(e.target.value)}>
                <option value={deliveryTime ? deliveryTime : ""}>{deliveryTime ? `${deliveryTime} dagen` : `Selecteer dagen tot levering` }</option>
                <option value={1}>1 dag</option>
                <option value={2}>2 dagen</option>
                <option value={3}>3 dagen</option>
                <option value={4}>4 dagen</option>
                <option value={5}>5 dagen</option>
                <option value={6}>6 dagen</option>
                <option value={7}>7 dagen</option>
                <option value={8}>8 dagen</option>
                <option value={9}>9 dagen</option>
                <option value={10}>10 dagen</option>
                <option value={11}>11 dagen</option>
                <option value={12}>12 dagen</option>
                <option value={13}>13 dagen</option>
                <option value={14}>14 dagen</option>
              </select>
              <label>Kleur (Weiß, Schwarz, Schwarz/Silber, Silber):</label>
              <input
                type="text"
                placeholder="Kleur (Weiß, Schwarz, Schwarz/Silber, Silber)"
                value={color ? color : ""}
                onChange={(e) => setColor(e.target.value)}
                required
              />
              <PrimaryButton type="submit">
                {editStatus === "Loading..." ? "Submitting..." : "Save"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (
                <>
                  <img src={previewImg} alt="error!" />
                </>
              ) : (
                <p>The product image preview appears here!</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit = styled.button`
  border: none;
  outline: none;

  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  label {
    font-size: 15px;
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
