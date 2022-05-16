# 돌아보기

## 핵심 개념

- 함수를 합성해서 복잡한 프로그램을 쉽게 만들기
- 부수효과를 공통적인 방법으로 추상화

## 함수형 프로그래밍의 목적

순수함수, 불변성, 참조 투명성, 부분적용과 커링,  
서술과 실행의 분리, lazy ...

> 함수들을 더 안전하고 쉽게 합성하기

## 수 많은 Context들

```
T : 값
Array<T>: 여러 개이고, 몇 개인지 모르는 값

실패의 처리
Option<T>: 실패해서 결과가 없을 수 있는 값
Try<T>: 실패해서 예외가 발생한 값

비동기와 반응형
Promise<T>: 언제 올지 모르는 값
Obseravle<T>: 여러 번 발생하고, 구독할 수 있는 값
```

## map과 flatMap

```
f : A => B

Functor
map: (A => B) => (F<A> => F<B>)

Monad
flatMap: (A => F<B>) => (<F<A> => F<B>)
```

map : 특정한 맥락이나 구조를 유지하며 합성
flatMap : 맥락이나 구조가 중첩되어도 합성할 수 있도록 도와줌

## context마다 정의된 map

```ts
double(4) // 8
  [(1, 2, 3, 4)].map(double); // [2, 4, 6, 8]
Option.map(oFour, double); // Some<8> | None
Try.map(tFour, double); // Success<8> | Failed<e>
promiseFour.then(double); // Promise<8>
of(1, 2, 3, 4).pipe(map(double)); // Observable<2 4 6 8>
```

## functor의 법칙

```
functor는 함수 합성을 보존한다.
f: A => B
g: B => C
map(compose(g, f)) === compose(map(g), map(f))

functor는 identity를 보존한다.
id: A => A
map(id) === id
```

## 어떻게 합성할 것인가?

- `f: A => Functor<B>`
- `g: B => Functor<C>`

> `flatMap: (A => B) => Functor<A> => Functor<B>`

## monad 법칙

```
Left identity: return a >>= f === fa
Right identity: m >>= return === m

Associativity: (m >>= f) >>= g === m >>= (\x -> fx >>=)
```
