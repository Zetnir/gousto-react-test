import { Link } from "@reach/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setProducts, setDefault } from "./redux/products";
import { setCategories } from "./redux/categories";
import ProductsService from "./services/ProductsService";

export const Menu = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(-1);
	const [selectedProduct, setSelectedProduct] = useState(-1);
	const [searchInput, setSearchInput] = useState("");

	const products = useSelector((state) => state.products.products);
	const defaultProducts = useSelector(
		(state) => state.products.defaultProducts
	);
	const categories = useSelector((state) => state.categories.categories);
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const productResponse = await ProductsService.getProducts();
			dispatch(setProducts(productResponse.data.data));
			dispatch(setDefault(productResponse.data.data));

			const categoryResponse = await ProductsService.getCategories();
			dispatch(setCategories(categoryResponse.data.data));

			setTimeout(() => setIsLoading(false), 1000);
		}

		if (defaultProducts.length == 0) fetchData();

		const categoryId = props.match.params.category;
		setSelectedCategory(categoryId);
		sortProductsByCategory(categoryId);
	}, [props]);

	const sortProductsByCategory = (id) => {
		if (id) {
			const newProducts = defaultProducts.filter((product) => {
				const productFromCategory = product.categories.find(
					(category) => category == id
				);
				if (productFromCategory) {
					return product;
				}
			});
			dispatch(setProducts(newProducts));
		} else {
			dispatch(setProducts(defaultProducts));
		}
	};

	const onInputChange = (e) => {
		e.preventDefault();
		const newInput = e.target.value;
		setSearchInput(newInput);
		const newProducts = defaultProducts.filter((product) => {
			if (
				product.title.toLowerCase().includes(newInput.toLowerCase()) ||
				product.description
					.toLowerCase()
					.includes(newInput.toLowerCase())
			) {
				return product;
			}
		});
		dispatch(setProducts(newProducts));
	};

	const onProductClick = (e, index) => {
		e.preventDefault();
		setSelectedProduct(index);
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<div
					style={{
						width: "20%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
					}}
				>
					<div
						style={{
							position: "fixed",
							height: "100%",
							width: "20%",
							marginBottom: "100px",
						}}
					>
						<Link style={{ textDecoration: "none" }} to={`/`}>
							<h1
								className="title"
								style={{ direction: "ltr", marginLeft: "20px" }}
							>
								Menu
							</h1>
						</Link>
						<div
							style={{
								overflowY: "auto",
								direction: "rtl",
								height: "92%",
								width: "100%",
								bottom: 0,
								position: "absolute",
							}}
						>
							{categories.map((category, index) => {
								return (
									<Link
										style={{
											textDecoration: "none",
											color: "black",
										}}
										key={index}
										to={`/${category.id}`}
									>
										<h3
											style={{
												textDecoration: "none",
												fontWeight: `${
													selectedCategory ===
													categories[index].id
														? "bold"
														: "normal"
												}`,
												direction: "ltr",
												cursor: "pointer",
												paddingRight: "15px",
												paddingLeft: "15px",
											}}
										>
											{category.title}
										</h3>
									</Link>
								);
							})}
						</div>
					</div>
				</div>

				<div
					style={{
						width: "80%",
						position: "fixed",
						height: "100%",
						right: 0,
					}}
				>
					<div
						style={{
							width: "100%",
							height: "100px",
							display: "flex",
							alignItems: "center",
						}}
					>
						<input
							value={searchInput}
							onChange={onInputChange}
							style={{
								width: "95%",
								padding: "10px",
								margin: "15px",
							}}
							type="text"
						/>
					</div>
					{!isLoading ? (
						<div
							style={{
								position: "absolute",
								overflowY: "auto",
								bottom: 0,
								width: "100%",
								height: "90%",
							}}
						>
							{products.map((product, index) => {
								return (
									<div
										key={index}
										style={{
											paddingBottom: "25px",
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											cursor: "pointer",
										}}
										onClick={(e) =>
											onProductClick(e, index)
										}
									>
										<h3 style={{ margin: 0 }}>
											{selectedProduct == index
												? "-"
												: "+"}{" "}
											{product.title}
										</h3>
										{selectedProduct == index && (
											<div
												style={{
													paddingBottom: "25px",
												}}
											>
												{product.description}
											</div>
										)}
									</div>
								);
							})}
						</div>
					) : (
						<div>Loading...</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
