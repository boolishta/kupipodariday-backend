import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExists = 101,
  Unauthorized = 102,
  UserNotFound = 103,
  WishNotFound = 104,
  NotAllowedContributions = 105,
  AmountCannotExceedValueGift = 106,
  OfferNotFound = 107,
  WishlistNotFound = 108,
  CreateOfferError = 109,
  CannotChangeWishError = 110,
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
  [
    ErrorCode.NotAllowedContributions,
    'Пользователю нельзя вносить деньги на собственные подарки',
  ],
  [
    ErrorCode.AmountCannotExceedValueGift,
    'Сумма собранных средств не может превышать стоимость подарка.',
  ],
  [ErrorCode.OfferNotFound, 'Предложение не найдено'],
  [ErrorCode.WishlistNotFound, 'Список подарков не найден'],
  [ErrorCode.CreateOfferError, 'Не удалось создать предложение'],
  [
    ErrorCode.CannotChangeWishError,
    'Вы не можете изменять стоимость подарка, если уже есть желающие скинуться',
  ],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.Unauthorized, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.NotAllowedContributions, HttpStatus.UNPROCESSABLE_ENTITY],
  [ErrorCode.AmountCannotExceedValueGift, HttpStatus.UNPROCESSABLE_ENTITY],
  [ErrorCode.OfferNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishlistNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.CreateOfferError, HttpStatus.INTERNAL_SERVER_ERROR],
  [ErrorCode.CannotChangeWishError, HttpStatus.FORBIDDEN],
]);
