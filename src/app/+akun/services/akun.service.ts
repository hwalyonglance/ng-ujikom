import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Akun, XAuthService } from '../../+x';
import { HakAkses } from '../types';

@Injectable()
export class AkunService {
	_hakAkses: HakAkses[] = ['Admin', 'Petugas', 'Pegawai'];
	auth_: BehaviorSubject<Akun<HakAkses> | null> = new BehaviorSubject<Akun<HakAkses> | null>(null);
	akun: BehaviorSubject<any> = new BehaviorSubject<any>(false);
	constructor(
		private $_ngRouter: Router
	){
		try {
			this.akun.next(JSON.parse(localStorage['akun']))
		}catch (e){
			this.akun.next(false)
		}
	}
}
