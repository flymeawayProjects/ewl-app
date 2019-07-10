import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.class';
import { Injectable } from '@angular/core';
import { IProfile } from '../consts/IProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profiles: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  private profileId = 0;

  constructor() {}

  createNewProfile(profileData: IProfile): void {
    this.profiles.next([...this.profiles.getValue(), new Profile(this.profileId++, profileData)]) ;
  }

  getAllProfiles(): Observable<Profile[]> {
    return this.profiles.asObservable();
  }

  getProfileById(id: number): Profile {
    return this.profiles.getValue().find(profile => profile.getId() === id);
  }

  removeProfileById(id: number): void {
    this.profiles.next(this.profiles.getValue().filter(profile => profile.getId() !== id));
  }

  updateProfileById(id: number, profileData: IProfile): void {
    const profile = this.getProfileById(id);
    profile.setProfileData(profileData);
  }
}
