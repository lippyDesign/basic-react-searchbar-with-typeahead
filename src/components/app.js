import React, { Component } from 'react';

const typeaheadOptions = ["bag", "wallet", "green", "leather", "Lena", "Les", "NASA"]

export default class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            term: '',
            searchOptionSelected: false
        };
    }

    onInputChange(event) {
        this.setState({
            term: event.target.value,
            searchOptionSelected: false
        })
    }

    getTypeaheadOptions() {
        // chooseItems function filters a list and returns items that contain searchText
        const chooseItems = (searchText, list) => (
            list.filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
        );
        
        // get the value of the input and assign in to searchText var
        const searchInputText = this.state.term.trim();
        // if searchtext is not empty
        if (searchInputText) {
            // use choose items function to locate the typeahead options
            const searchOptions = chooseItems(searchInputText, typeaheadOptions);
            // if typeahead option not selected render typeahead options to the screen
            if (!this.state.searchOptionSelected) {
                return searchOptions.map(current => (
                    <li onClick={() => this.typeaheadOptionSelected(current) } className="typeaheadOptionsListItem" key={current}>{current}</li>)
                );
            }
        }
    }
    typeaheadOptionSelected(option) {
        this.setState({
            term: option,
            searchOptionSelected: true
        })
    }

    onFormSubmit(event) {
        event.preventDefault();
        // go and fetch product data
        this.props.fetchProducts(this.state.term);
        // clear search bar
        this.setState({ term: '' });
    }

    render() {
        return <form className="searchProductForm" onSubmit={this.onFormSubmit.bind(this)} >
                <span className="searchProductInputAndButtonWrapper">
                    <input
                        placeholder="Type in a Category, Make, Model, SKU #, etc..."
                        className="searchProductInput"
                        value={this.state.term}
                        onChange={this.onInputChange.bind(this)}
                    />
                    <button type="submit" className="searchProductButton">
                        Search
                    </button>
                </span>
                <ul className="typeaheadOptionsList">
                    {this.getTypeaheadOptions()}
                </ul>
            </form>
    }
}
