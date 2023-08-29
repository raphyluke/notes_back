// Create a service for the users module with login, register, and logout methods. I want also to implement google Oauth. All of this with passport
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
<<<<<<< HEAD
=======
import { Users } from '../schema/users.schema';
>>>>>>> 6c97740b9b763a2de814ba81746bad90a775efbf
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
        constructor(@InjectModel('Users') private readonly usersModel: Model<any>, private jwtService : JwtService) {}
    
        async login(data: any) {
            return await this.usersModel.findOne({username: data.username, password: data.password});
        }
    
        async register(data: any) {
            return await this.usersModel.create(data);
        }
    
        async logout() {
            return await this.usersModel.find();
        }

        async googleLogin(req, res) {
          if (!req.user) {
            return 'No user from google';
          }
          this.usersModel.findOne({email: req.user.email}).then(user => {
            if (!user) {
              this.usersModel.create({
                first_name: req.user.firstName,
                last_name: req.user.lastName,
                email: req.user.email,
                username: req.user.email.split('@')[0],
                picture : req.user.picture,
                oauth_accounts: 'google'
              }).then(user => {
                const payload = {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                  picture : user.picture,
                  first_name: user.first_name,
                  last_name: user.last_name,
                };
                res.redirect('http://localhost:5173?data=' + encodeURIComponent(JSON.stringify({
                  message: 'User created successfully',
                  token : this.jwtService.sign(payload)
                })))
              })
            } else {
              const payload = {
                id: user._id,
                username: user.username,
                email: user.email,
                picture : user.picture,
                first_name: user.first_name,
                last_name: user.last_name,
              };
              res.redirect('http://localhost:5173?data=' + encodeURIComponent(JSON.stringify({
                message: 'User retrieved successfully',
                token : this.jwtService.sign(payload)
              })))
            }
          })
          .catch(err => {
<<<<<<< HEAD
            console.log(err);
            return err;
=======
            return res.send(400).json({
              message: err
            });
>>>>>>> 6c97740b9b763a2de814ba81746bad90a775efbf
          })
        }
}
