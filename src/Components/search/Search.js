import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import API_KEY from '../../api_key';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
   state = {
      searchText: '',
      amount: 15,
      orientation: 'all',
      order: 'popular',
      apiUrl: 'https://pixabay.com/api',
      apiKey: API_KEY,
      images: []
   };

   getImages = () => {
      axios
         .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&lang="fr"&image_type=photo&per_page=${this.state.amount}&orientation=${this.state.orientation}&order=${this.state.order}&safesearch=true`
         )
         .then(res => this.setState({ images: res.data.hits }))
         .catch(err => console.log(err));
   };
   onTextChange = e => {
      const val = e.target.value;
      this.setState({ [e.target.name]: val }, () => {
         if (val === '') {
            this.setState({ images: [] });
         } else {
            this.getImages();
         }
      });
   };

   onAmountChange = (e, index, value) => {
      this.setState({ amount: value });
      this.getImages();
   };
   onOrientationChange = (e, index, value) => {
      this.setState({ orientation: value });
      this.getImages();
   };
   onOrderChange = (e, index, value) => {
      this.setState({ order: value });
      this.getImages();
   };

   render() {
      console.log(this.state);
      return (
         <div>
            <TextField
               name="searchText"
               value={this.state.searchText}
               onChange={this.onTextChange}
               floatingLabelText="Rechercher des images..."
               fullWidth={true}
            />
            <br />
            <SelectField
               name="amount"
               floatingLabelText="Nombre"
               value={this.state.amount}
               onChange={this.onAmountChange}
            >
               <MenuItem value={5} primaryText="5" />
               <MenuItem value={10} primaryText="10" />
               <MenuItem value={15} primaryText="15" />
               <MenuItem value={30} primaryText="30" />
               <MenuItem value={50} primaryText="50" />
            </SelectField>
            <SelectField
               name="orientation"
               floatingLabelText="Orientation de la photo"
               value={this.state.orientation}
               onChange={this.onOrientationChange}
            >
               <MenuItem value="all" primaryText="Toutes" />
               <MenuItem value="horizontal" primaryText="Horizontal" />
               <MenuItem value="vertical" primaryText="Vertical" />
            </SelectField>
            <SelectField
               name="order"
               floatingLabelText="Trier par"
               value={this.state.order}
               onChange={this.onOrderChange}
            >
               <MenuItem value="popular" primaryText="Les plus populaires" />
               <MenuItem
                  value="latest"
                  primaryText="Les dernières nouveautés"
               />
            </SelectField>
            {this.state.images.length > 0 ? (
               <ImageResults images={this.state.images} />
            ) : null}
         </div>
      );
   }
}
export default Search;
