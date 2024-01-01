import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExists = 101,
  Unauthorized = 102,
  UserNotFound = 103,
  WishNotFound = 104,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Некорректная пара логин и пароль'],
  [
    ErrorCode.UserAlreadyExists,
    'Пользователь с таким email или username уже зарегистрирован',
  ],
  [ErrorCode.Unauthorized, 'Пользователь не авторизирован'],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],
  [ErrorCode.WishNotFound, 'Подарок не найден'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.Unauthorized, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
]);
