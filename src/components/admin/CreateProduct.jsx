import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsCreate } from "../../slices/productsSlice";
import Select from 'react-select';
import toast from "react-hot-toast";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from "@tiptap/extension-document"
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const CreateProduct = () => {
	const dispatch = useDispatch();
	const { createStatus } = useSelector((state) => state.products);
	
	const [productImg, setProductImg] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [brand, setBrand] = useState("");
	const [name, setName] = useState("");
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

	// Description input add
	const [inputs, setInputs] = useState([]);
	// const [inputData, setInputData] = useState([]);

	const categories = [
		{ value: "", label: ""},
		{ value: "monitorarm", label: "Monitorarm"},	
		{ value: "accessoires", label: "Accessoires"}
	]

	const conditions = [
		{ value: "", label: ""},
		{ value: "refurbished", label: "Refurbished"},	
		{ value: "neue", label: "Neue"}
	]

	const ranglijst = [
		{ value: "", label: ""},
		{ value: "bestseller", label: "Bestseller"},	
		{ value: "neue", label: "Neue"},
	]

	const soldOutStatus = [
		{ value: "", label: ""},
		{ value: false, label: "Nicht ausverkauft"},
		{ value: true, label: "Ausverkauft"}
	]

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

	// const handleAddInput = () => {
	// 	setInputs([...inputs, {
	// 		key: Math.random(),
	// 		value: ''
	// 	}]);
	// }

	// const handleInputChange = (key, event) => {
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const html = editor.getHTML()
		
		try {
			if(html) {
				dispatch(
					productsCreate({
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
						category,
						condition,
						ranking,
						soldOut,
					})
				);
			}
		} catch (error) {
			toast.error(error);
		}
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
    content: `<h2>Schrijf een beschrijving</h2>`,
  })

	const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

	return (
		<StyledCreateProduct>
			<StyledForm>
				<h3>Voeg een product toe</h3>
				<input
					id="imgUpload"
					accept="image/*"
					type="file"
					onChange={handleProductImageUpload}
					multiple
					required
				/>
				{/* <select onChange={(e) => setBrand(e.target.value)} required>
          <option value="">Selecteer Kleur</option>
          <option value="groen">Groen</option>
          <option value="blauw">Blauw</option>
          <option value="rood">Rood</option>
        </select> */}
				<input
					type="text"
					placeholder="Titel"
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<div className="editor">
					<button onClick={addImage}>add image from URL</button>
					<MenuBar className="menubar" editor={editor}/>
					<EditorContent className="editorcontent" editor={editor}/>
				</div>
				<input
					type="number"
					placeholder="Prijs Inclusief BTW"
					onChange={(e) => setPrice(e.target.value)}
					step=".01"
					required
				/>
				<input
					type="number"
					placeholder="Oude prijs (afgeprijsd)"
					onChange={(e) => setSale(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Voorraad"
					onChange={(e) => setStock(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Percentage BTW"
					onChange={(e) => setTax(e.target.value)}
				/>
				<input
					type="text"
					placeholder="PN (45-241-026)"
					onChange={(e) => setPN(e.target.value)}
				/>
				<input
					type="text"
					placeholder="EAN (4260218663152)"
					onChange={(e) => setEAN(e.target.value)}
				/>
				<select onChange={(e) => setDeliveryTime(e.target.value)}>
          <option value="">Selecteer dagen tot levering</option>
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
				<input
					type="text"
					placeholder="Kleur (Weiß, Schwarz, Schwarz/Silber, Silber)"
					onChange={(e) => setColor(e.target.value)}
					required
				/>
				<Select
					placeholder="Selecteer categorieën"
					onChange={(e) => setCategory(e.value)}
					options={categories}
					className="basic-multi-select"
					classNamePrefix="Selecteer categorieën"
				/>
				<Select
					placeholder="Selecteer conditie"
					onChange={(e) => setCondition(e.value)}
					options={conditions}
					className="basic-multi-select"
					classNamePrefix="Selecteer conditie"
				/>
				<Select
					placeholder="Selecteer ranglijst"
					onChange={(e) => setRanking(e.value)}
					options={ranglijst}
					className="basic-multi-select"
					classNamePrefix="Selecteer ranglijst"
				/>
				<Select
					placeholder="Uitverkocht?"
					onChange={(e) => setSoldOut(e.value)}
					options={soldOutStatus}
					className="basic-multi-select"
					classNamePrefix="Uitverkocht?"
				/>
				<PrimaryButton onClick={(e) => handleSubmit(e)} type="submit">
					{createStatus === "Laden..." ? "Indienen..." : "Opslaan"}
				</PrimaryButton>
			</StyledForm>
			<ImagePreview>
				{productImg[0] ? (
					<>
						<img src={productImg[0]} alt="error!" />
					</>
				) : (
					<p>Het voorbeeld van de productafbeelding verschijnt hier</p>
				)}
			</ImagePreview>
		</StyledCreateProduct>
	);
};

export default CreateProduct;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
	width: 100%;
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

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
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
