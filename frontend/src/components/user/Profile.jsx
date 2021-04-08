/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row, Col, Form, Button, Image,
} from 'react-bootstrap';
// import axios from 'axios';
import NavBar from '../landing/NavBar';
// import apiHost from '../../apiHost';
import { getUser, updateUser, updateUserImage } from '../../actions/user/userProfileActions';
// import imageUrl from '../../config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
    };
    this.props.getUser();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { user } = nextProps;
      const userData = {
        name: user.name || this.state.name,
        email: user.email || this.state.email,
        phone: user.phone || this.state.phone,
        language: user.language || this.state.language,
        currency: user.currency || this.state.currency,
        timezone: user.timezone || this.state.timezone,
        image: user.image || this.state.image,
        message: user.message || this.state.message,
      };
      this.setState(userData);
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeTimezone = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    localStorage.setItem('timezone', e.target.value);
  }

  onAvatarChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  }

  onUpload = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
    } else {
      e.preventDefault();
      const data = this.state.file;
      this.props.updateUserImage(data);
    }
  }

  onSave = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
    } else {
      e.preventDefault();
      const data = { ...this.state };
      this.props.updateUser(data);
    }
  }

  render() {
    let redirectVar = null;
    if (this.state.message === 'PROFILE_UPDATE_SUCCESS') {
      localStorage.setItem('name', this.props.user.name);
      redirectVar = <Redirect to="/home" />;
    }
    let image = null;
    let filename = this.state.filename || 'Choose your Avatar';
    if (this.props.user.message === 'PROFILE_UPDATE_IMAGE_SUCCESS') {
      filename = 'Choose your Avatar';
    }
    if (this.state.image) {
      image = this.state.image;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div className="mt-5">
          <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <h4>Your Account</h4>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={{ span: 3, offset: 1 }}>
              <Form noValidate validated={this.state.validated} onSubmit={this.onUpload}>
                <Form.Row>
                  <Form.Group as={Col} md={{ span: 3, offset: 1 }}>
                    <Image style={{ width: '17rem' }} src={image} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3}>
                    <Form.File
                      className="mt-3"
                      name="image"
                      id="image"
                      style={{ width: '21rem' }}
                      accept="image/*"
                      label={filename}
                      onChange={this.onAvatarChange}
                      custom
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload an Avatar.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row className="d-flex" style={{ justifyContent: 'flex-end' }}>
                  <Form.Group as={Col} md={3}>
                    <Button variant="info" type="submit">Upload</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
            <Col md={{ offset: 1 }} className="mt-5 pt-5">
              <Form noValidate validated={this.state.validated} onSubmit={this.onSave}>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                  <Form.Group as={Col} md="4">
                    <Form.Label>Your Default Currency</Form.Label>
                    <Form.Control
                      name="currency"
                      as="select"
                      value={this.state.currency}
                      onChange={this.onChange}
                    >
                      <option>USD</option>
                      <option>KWD</option>
                      <option>BHD</option>
                      <option>GBP</option>
                      <option>EUR</option>
                      <option>CAD</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a currency.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Your Email Address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                  <Form.Group as={Col} md="4">
                    <Form.Label>Your Time Zone</Form.Label>
                    <Form.Control
                      name="timezone"
                      as="select"
                      value={this.state.timezone}
                      onChange={this.onChangeTimezone}
                    >
                      <option value="Etc/GMT+12">(GMT-12:00) International Date Line West</option>
                      <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                      <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                      <option value="US/Alaska">(GMT-09:00) Alaska</option>
                      <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                      <option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</option>
                      <option value="US/Arizona">(GMT-07:00) Arizona</option>
                      <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                      <option value="US/Mountain">(GMT-07:00) Mountain Time (US & Canada)</option>
                      <option value="America/Managua">(GMT-06:00) Central America</option>
                      <option value="US/Central">(GMT-06:00) Central Time (US & Canada)</option>
                      <option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                      <option value="Canada/Saskatchewan">(GMT-06:00) Saskatchewan</option>
                      <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                      <option value="US/Eastern">(GMT-05:00) Eastern Time (US & Canada)</option>
                      <option value="US/East-Indiana">(GMT-05:00) Indiana (East)</option>
                      <option value="Canada/Atlantic">(GMT-04:00) Atlantic Time (Canada)</option>
                      <option value="America/Caracas">(GMT-04:00) Caracas, La Paz</option>
                      <option value="America/Manaus">(GMT-04:00) Manaus</option>
                      <option value="America/Santiago">(GMT-04:00) Santiago</option>
                      <option value="Canada/Newfoundland">(GMT-03:30) Newfoundland</option>
                      <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                      <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</option>
                      <option value="America/Godthab">(GMT-03:00) Greenland</option>
                      <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                      <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                      <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                      <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                      <option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                      <option value="Etc/Greenwich">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                      <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                      <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                      <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                      <option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                      <option value="Africa/Lagos">(GMT+01:00) West Central Africa</option>
                      <option value="Asia/Amman">(GMT+02:00) Amman</option>
                      <option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                      <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                      <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                      <option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</option>
                      <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                      <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                      <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                      <option value="Africa/Windhoek">(GMT+02:00) Windhoek</option>
                      <option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                      <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                      <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                      <option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</option>
                      <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                      <option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                      <option value="Asia/Baku">(GMT+04:00) Baku</option>
                      <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                      <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                      <option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</option>
                      <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                      <option value="Asia/Calcutta">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                      <option value="Asia/Calcutta">(GMT+05:30) Sri Jayawardenapura</option>
                      <option value="Asia/Katmandu">(GMT+05:45) Kathmandu</option>
                      <option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</option>
                      <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option>
                      <option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</option>
                      <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                      <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                      <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                      <option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</option>
                      <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                      <option value="Australia/Perth">(GMT+08:00) Perth</option>
                      <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                      <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                      <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                      <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                      <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>
                      <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                      <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                      <option value="Australia/Canberra">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                      <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                      <option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</option>
                      <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                      <option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                      <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                      <option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                      <option value="Pacific/Tongatapu">(GMT+13:00) Nuku&apos;alofa</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a timezone.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Your Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      type="text"
                      value={this.state.phone}
                      onChange={this.onChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a phone number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                  <Form.Group as={Col} md="4">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      name="language"
                      as="select"
                      value={this.state.language}
                      onChange={this.onChange}
                    >
                      <option selected="selected" value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="id">Bahasa Indonesia</option>
                      <option value="it">Italiano</option>
                      <option value="ja">日本語</option>
                      <option value="nl">Nederlands</option>
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="pt-PT">Português (Portugal)</option>
                      <option value="sv">Svenska</option>
                      <option value="th">ภาษาไทย</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a language.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={{ span: 4, offset: 7 }}>
                    <Button variant="info" type="submit" style={{ width: '4.5rem' }}>Save</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserImage: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  user: state.userProfile.user,
});

export default connect(mapState, { getUser, updateUser, updateUserImage })(Profile);
