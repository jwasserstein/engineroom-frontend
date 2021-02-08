import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUsers, editProfile} from '../../store/actions/users';
import AWS from 'aws-sdk';
import './EditProfilePage.css';

class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            bio: '',
            image: null,
            loading: false,
            error: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    checkMissingData() {
        const {authReducer, userReducer, getUsers} = this.props;

        // Check for missing data: loggedInUser
        if(!(authReducer.userId in userReducer.users)){
            getUsers([authReducer.userId])
                .then(() => {
                    const loggedInUser = this.props.userReducer.users[authReducer.userId];
                    this.setState({
                        firstName: loggedInUser.firstName,
                        lastName: loggedInUser.lastName,
                        bio: loggedInUser.bio
                    });
                });
        }
    }

    componentDidMount() {
        const {authReducer, userReducer} = this.props;

        document.title = 'EngineRoom | Edit Profile';
        if(authReducer.userId in userReducer.users){
            const loggedInUser = userReducer.users[authReducer.userId];
            this.setState({
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                bio: loggedInUser.bio
            });
        } else {
            this.checkMissingData();
        }
    }

    componentDidUpdate() {
        this.checkMissingData();
    }

    onChange(e){
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit(){
        const {firstName, lastName, bio, image} = this.state;
        const {history, authReducer, editProfile} = this.props;

        this.setState({...this.state, loading: true});

        if(!image) return this.setState({...this.state, loading: false, error: 'Please select an image first'});
        const fileExt = image.name.match(/\..+$/)[0]?.toLowerCase();
        if(!fileExt) return this.setState({...this.state, loading: false, error: "Couldn't determine the file extension"});
        const objectName = `${encodeURIComponent(authReducer.username)}/user-${String(Date.now())}${fileExt}`;

        const bucketName = 'engineroom';
        const bucketRegion = 'us-east-1';
        const identityPoolId = 'us-east-1:a5f8a152-c8b9-4a8a-9505-03dcd77f39b1';

        AWS.config.update({
            region: bucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: identityPoolId
            })
        });

        (new AWS.S3.ManagedUpload({
            params: {
                Bucket: bucketName,
                Key: objectName,
                Body: image
            }
        })).promise()
            .then(resp => editProfile(firstName, lastName, bio, resp.Location))
            .then(() => {
                this.setState({...this.state, 
                    firstName: '',
                    lastName: '',
                    bio: '',
                    image: null,
                    loading: false,
                    error: ''
                }, () => history.push(`/users/${authReducer.userId}`));
            })
            .catch(err => console.log('Error uploading: ' + err.message));
    }

    onFileChange(e){
        this.setState({...this.state, image: e.target.files[0]});
    }

    render() {
        const {userReducer, authReducer} = this.props;
        const {firstName, lastName, bio, loading, image} = this.state;
        const loggedInUser = userReducer.users[authReducer.userId];

        if(!loggedInUser) return <div>Loading...</div>;

        return (
            <div className='EditProfilePage-container'>
                <div className='EditProfilePage-title EditProfilePage-blob'>
                    <h2>Edit your Profile</h2>
                    <p>Edit your EngineRoom profile</p>
                </div>

                <div className='EditProfilePage-form EditProfilePage-blob'>
                    <div className='EditProfilePage-image-container'>
                        <label htmlFor='image'>Profile Image</label>
                        <img src={image ? URL.createObjectURL(image) : loggedInUser.imageUrl} alt='preview'/>
                        <label htmlFor='image'>Browse...</label>
                        <input type='file' id='image' name='image' accept='image/*' onChange={this.onFileChange}/>
                    </div>
                    <div className='EditProfilePage-field-container'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input type='text' id='firstName' name='firstName' value={firstName} onChange={this.onChange} placeholder='John' />
                        
                        <label htmlFor='lastName'>Last Name:</label>
                        <input type='text' id='lastName' name='lastName' value={lastName} onChange={this.onChange} placeholder='Doe' />
                        
                        <label htmlFor='bio'>Bio:</label>
                        <textarea id='bio' name='bio' value={bio} onChange={this.onChange} placeholder='Tell us about yourself...'></textarea>
                        <button className='EditProfilePage-submit-button' onClick={this.onSubmit}>{loading ? 'Loading...' : 'Submit'}</button>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userReducer: state.userReducer,
        authReducer: state.authReducer
    };
}

EditProfile.propTypes = {
    userReducer: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getUsers, editProfile})(EditProfile);