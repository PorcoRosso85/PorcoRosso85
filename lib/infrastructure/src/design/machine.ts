import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0B6AxAYwBsBLPAawG0AGAXUVFQHtYiAXIhgOzpAA9EBWACyCANCACeiAIwAOAGwAmDP0qqAnFP78FAdgDMwgL6GxaTLkIkKC2khCNmbTtz4IpOqWMkIVlDILVAuTVBGQVBBSk1Y1N0bBwAIwBXFhZOAH0YFnT0rFQwACcAWyJYZk4qW3omVnYuO1d+Ay9EQR0FP1VKSL1FPUo2mJAzeOTUjKycrAKGAjBK7gda5waBYRa3fsFlLv7+d34dGSkhkdwAUQA3MA4WAAJ+Bbslp3rQVyk5TwlEY-9AtTBULhSIyGSnOJYJKwQrpZB4PAMJK3eJSJ7VRx1Fy-dr+JpSBT8DZRBRqDBdSgaLS6AyCCHmaGw+GI5EseIcMA8Fjo+w1V7YhAyXGCfGEjYdNSdLpU7T6IwmYaQxkFOEIpEorAIZXpIgQVE8l5Y1ZuKSCOT+ORCok-BAKPRgjCE9SaWW0+nYbXM9VszXa3XxBQGvlG97SAnms1W8Vhfg7bpSXp2gY6d1QmEqr2s7Ba9M6vW4R40RbBlahk1mi1Rm2Rfjm3yUl00+WxBm5zManOw-24ORBzGl3hh3qVnTW7wKOQRR0qTSEoUySVyVOetVZ3257s4HR95ZvQcmz4jsetWTmro9PrJ5dt1cdv35lgFZAcWDw146lhgIr6ovPEt7j57QjS1Rw2PRInNUd40TLYUwVM4VxZO8NwfJ8XzfOoPy-AMd35Y0E3kI9xTUFQ4wvJNBngpUbyQn1OxVbtH2fV88HfVhsNwPRcJDfcEx0YCq28AxwjIhNL0olsPRo71s3vbAmPQ1jMPY79cEEbiB0AuQBNAm1enA6doPEuDJLTJlbzouSsAUli2M-VSimQUgwHSGyMM4HA0V-DFdwFO1CMoPQpFUfgZH4NQ9F0oS5AMp1yNg69zNo2SUPktDbOU+zsEc5zXPS9yOB-KpeX7ADpDkSgdOPBBem0clVHiq8qNbJKZPXLtUOYgqsNUv0OEuVhkFeIri1KgVPgnIi9LtOsGrEiiTMVFqMwslKOuwFTYEyGYknMTyNLKzZ+Km7xBHDDAoMaiSlqk1q13ovMNvsraoB2vbA28krfPw3oqo2QQgu2c95oS5rbpW5L2oY-NNu2pE9q4z7DU06RIr+vSIrJXwrsWhDpPuqzYde+H4nUpH-3GvRaxO1o2iUYGYKa0zkBSAALEa-zG40hD8cDjjFG1hCkR0AkBEIwgiKJUxZlh2dwD7iuRw6eYwPmCWqjwyVFsXgUl6IwemWYwHiQtFYp40NCUQRKoF7wpE+c1wiCcWQSlg2ZjmeIICIS4DoFSUrZt6qEyaf5nd1yJ9dMj3jdwMY0g4TIwGyXIY+mMAoFKT8Cj9i2CX8IONjUHQdAwAEdYlyPUxj+JJlTo2sEgVhc7LBdA8UYP9iUesZSbOl3aNr2wDmT8pjTiBh+T+Zya51uwgLjviTkDw4wbak5X76PB-TzPYGzjBAEWGQAfhkAfYZAGGGQB2hkAc4ZAGeGQAAOUAcsjACSGQA15UAdP1AE0GQBohkAeoZAAqGQAVww4A5FyFuvEVBKEBIJRAgRS5Owrq7KON1Dae0bt7Nkx9z7X3vs-d+39-5AJAdyGe30ywJkCI6OQtZbbSHxBdXwvcN6pgYAUCeBRRgpATukBwKcsAsLYZqfhhQACSEAwGuFJH8EiCgwSUDChFKKiAqb21Eoza6ZwhHsNwEkAoBBxGIEkcLaRsj5GRWqkFO0GB1Y42YawwoHDxiJzrnwuxBQsBEA4AAMwYJqTxYAho6OnmbWe+5SQr2MTIOR4UzHikOHoMunxZEyOLqaWxbDsAFDAAARySHANkAB3ZArBABVDEfQAAwxHyfoABtNADqDIAEQZNGiMABYMTTABBDIAawZAC-8YAAqV8GAOAZyYhwTSH7kipVZQQUQqmMUTVRQpc9ALKEMEWs9oBhpPsYI1xoiHFcJ4VMTRmy2GiKwHgZ8eBh76JqhEJQehJSrOmdVGR7h-CJMickjwm9kGaOzI0-MOAdF6JIXhMswkbl3MiQ86My8EmWjeQuD5qZ8DEDIOQKQwzgX7iEKIG0UR9j1WdOvN0QwOAMAnvAOwZhRojNcAAWnCBsGlZ5diUH2KOI46tUxUoxa4CIxI9j4sCiyg47LEoQ29FynirgdAsrxBY4OJdthOjXq6ZsyDEJtQlSjBAo54kijlcSCKsYNDL1CpHa29tRWqkhg9XUmrDohC1iBR5qhhZQWVX3S17ZLKpSwHa-2xcaa2k+GSGQCyIihHkJVcEBt1UEx9X1bxfr8KR0DQocIcCGGNiYTG-GyF1pmQYl4hgGAODICKGABAdwADiycACq6Y7gIE4GAJNZDehklNDIAGMy7QGHoQSlVny8Z3TzdDcGOoi0lrLRW6tdb0wACUjaNuba23iE5S6Rh7d2-t7rs2mVjaOx61l8pKQyCpVdHwoiOugbafQGajILU9atKGR63KnsTipbAF7pDptTYCbuECQZMzVbm71+a312Q4jlFyEGeJK3GgDa9MyDABrikB9R1ER1gbHcerq76erZScjBk9w1fWc2pdIUIG6nVgSod3OaajcaYbFXG8DJHMpQaI3lPDpHYMZFZlnFh3gfLcvKjoJD5jQrbEuuhpjy0rVtRtZ1RSkGHJcb44VXDKnMICb3kJjApSKmADGGI+gA1hkANcMgBpBkAJEML9ACo+oAUx1AAu1k-AhdwaUAD47jADuJokQdwNN3EMN+tw7RqM3t6LiNDjGn3WqshpgjO8s5dnsiF004VU0S37TYnNWG1o4YS5+pLe8UvYUABtKgAs7UAIuegA7tyfoAbzdABMyd-QAskrtMAGcMR9ABtDEfQAMgxNcAFBygAFNKfoAOfjAASDIAMwY6mACsGOplnAB2DIAfQZACBDIAQAZOs9cAKMGgBGDVfp-X+gDvN3GVLAILaWVDhZ7cXPwMmYu5ZY4exi7Gz1ZWK9nAjlXauAHxXQACEZP0APnagAZCL6QAkQf3ACqDIAGIYltfZq4AewYpCABMGBb94n4MHyRyAoTSamTcALvygBAY2-u5rzPnNrnfI6Jtwl3A39FJIZHL+7QP5dfS9j9b3Mm7w+5+zbR8muACEzQAV4GAFWlQAIW7tJUk-P7oPAA4-4AIoZADrDAAwAjQxH2wYAcwZAB-2oAHf1v4Xc0OSO03bHmWwZ7J2Lin4ts8S31AaLAhpwfNmQkUEmwJyNdYB+7TO8svuezxjjvUNz9UGqRi7lArvmLtKXBmxkLesYK9bortuQ91A2sH+375dNpAKMJr6VPg2u70sGs3XuQM+6U2lf3r2OLJ4z6n9x6eHf8cEznqd5bK01pYAAeVcQACRb+IRtjkOC5-g-hHQbRaeEkgp72PD2FPx9Z1X9nHEVITsTZTyVlGAi06pvexnZfHvYaX9p6vqk18eO8RgXnvWCdI4-oATwZJsLbh7t-bdwSfec2sFzfWrTQBs3XMWEGk1n0fXny9RZ27AnhHhcmVDSwlFTWpB3UYSJW9yP0gPzGgKnnSGVDbxnQABFJ5Px61Chl0OR4DDhU1Jw-Bos580CF8nsYZno4Zdo0tZBC8hIjgQCH1QZ6CIDfcmCvwXo3ov1f9DoCRIpacSJhYtAeDgNh10CBCnohCWDzBOdksVRiZWCxCEMd9AD-pBUS86DD8GDj9uwiYRD3tYQtDMBAAGhnMyPgVwa2a0OwAQu3EzLho0FntlLju2MIUNMIwOUKKGEJJisM0JEN5wFxF3F3sMcKl1+1BzSwCAj3+ncEdlAN4JMP4Ir3cWYJsI9FQAgCGhchsOSNuUDXDRnzkIw3kxyMJnyMsN2mKNHgKLiIVzf0AEhNQAF7MkidD8IqNKiw0jCwC+Dn1ciLCwisDWi3pki9CvChIhQlBaDRjsjxiGiVCCisBpjSiRD2in5AApJUABM0vokTLfNwFIqQjLPw1YgI+on1SY3abAGw9fBgZI+nfQwWa2bgg-O49Yh4xosIl4y-Ytdot-PBVw5IkuSogIZYzI+Q5jQIpQqEIokonA9MeAqIVNORMkJVFA1VP4uLeNVE0eXA3nN-boqpU4vPc48MVI6sdI5ArNVAtYyGdQkrFUOA-ossEIWMPVdWYkeQD3AdD1cA59dkj7Mk7rPnRrStKpQAeMjecn5AAdeUSK-mEQADkABlc4edAAFTcx81OwpzOK1UCF1VFGDgdUMl3RZLOBllZhC0iniTVhoTcG0hFnDkrlkGjWZjZlENNMOkllVieTdOEBkCsW0hii+ACDkTCmln9KwAIAYEzj3DHzLC+BdNDMeVDgny9NdjBATNlmwGTNTIDJpK1R1QulkGQzOk9IQT1iLLllLI8QwAdMgBC20mFldPMQoTzIbKrgNgdJLJTKRBYE7ITBDP5mqjo3rKBG9KQXtMTNLLHOv2lMAFiowAHijK1yS9sITDSTt0wzsf9AyBQuypyBSbR9AyR+z5zEFUx8hihShyg0ynd9xRwIzgoFFqozQ6obisizhHySgyhU9MFL5b5H59tqT0z9xIlzQvyYlBYJ8aD4TaiMkjYQsPA+TC4bQwhljRY7zGyB5UFMKYoF43TAhuyFk6djhDhqRq5t5iA94Qti5sLF4cUZFHYCKXYiKt5UEmK2RVTAAIO0AH8GGOSC-cwBNLboXVHCu2Z0i6biiON2Pi2OCUwoNgkUTwm9SUG8pShchi1BdS9hMC7BCSg7AhNgiKbSmZWBRS-M3i5BGucIjAQAJyjABlfRjgW0ABIFdpNbUy2+QAWUTAB0JSfh6WgrfI+HClLjUC7UQu8DstvJ4sHNUuwCbnHO5N4gGGWKoXYrtmAJtPxKHUhGcvSsPlPnApwSgshMyo+EpBoNyrdM0FikzUJQJJKu3jKo8q8t8v8oquwRCrCt6RqtPIGJCEdGnOJCaDhJFL3Scu3h2OkpXmoLyvKgGEKuZParUIWqIONm6qNkOJOJGorPEPtjJBWqauCGFNtK2vQtQRBJYrCnIuDkqj0ocpSvmvusnUAFuGI+czcEiyqS2qsMVQMuOSsMSg+BQij6s4ZykEjAX6-6nbGzXnBXQAS4Yb5qrLLga3BApZLVq3Aax7KByVKvlXEQtwg6zApgoWVIVqwqZ4ljUkl4VUkDZvkyNRqywnRo9JlabolkMIFVZRxfjIR2bMkck8knSZorFrZ7l+bJMKjQ0qYzQSIYpIlirzAxbslck94MBCkSlylKlakGktkIAWkOlwrjqYLXA+ZthTRAoIV5baNdAMAlallVbVkNbsAtaJbdbecFtABDhj+rl0AEmGQAG4ZABOhifkAEAEr+VbBbbGzm0ZSJGQs0GKKJb8520uN2lWlZdW9ZLRJtU2qWhZGWh2jO+KgxdoMkJmuFFJL2lxdJQ5ERfMKWrtMuuWzO6sLLai92vOtZNm1xH5U27AU5Dgc5AgKWjQDux2ruoSEOVWRZXOtWge0ydmouo5fMMeiegzQ2p+be4edpHoiKkJG2hZDtWW2eyumqNNJQHO5ZFehu9e35bAa4AoIgTxEgJvV80+pRJ5Geiu5DUkF0peh+z2gu4eze1+woD+r+4aQzI+QAP+dAA2pyfn1pYEADx--IDgb2DgKAI+3oq2yKpRcCC+8uumoSVZV20Bj2-Owepujelu6B9+z+05YaLc7+eOxOk6gUAwLEmswkUKJ2vSRDRe5WsBuhteoe5ugobZDUsAfJO4PeEou4KQNuu2y+wBx5MEO+mh-up+6RhAPxAJTJKWnfcTbSfoChgxIWF5WFboFmgxhh4xlgQJXeipZBwAQZssagak6z6SJHRAR07rHbQKo-Ba6HH66IHfF-FXHMkMBABo1MAGnNfnQAZNSbM74Ks0nAAZX0ADkEp+GpJbBBnxtwnG0h3woJqx4R8cKhLWV5SJhFeh+xdMN+im0IMkamqZapkhyaMxEWzWoelp+xBBrxp+bB3BqAGzCAZtAhk+ijW0JoHmmmoRuepRM6eJK0fpjAQAGAZed2k5dABqhkADKGG+QACYYn5WkltABtBjWwxyxxv0OZOdOfaUADW5BbO5woJUwAbaNABQ-RqTW0ebOcAFDFdXQAB1NvLX47Nv5ABYBiaTqUADEGQAQMjAA3uTaYNVLvrD2GFWOHdF2elP2eObOYueuducx0+elN60BeebeY+YKG+b+YBcJdOZBfBchZhbhaReRYwGVDuB4F8zJYKAW0AFo5VJkzCzUiqxahbWcuQIcUcPLGZlVlQ4X0m6PFnrAlp54lm52lh5pl1595gV+l-5qllliF+zdlhFlFtsiyXlu4FSO4AAMgCzZ0woUHFAIgFSxbZRVZGDVaPg1aJcue1cNYpapf1Z1elKfl+eNaZdNbZa-lhcta5ftb5Y0zYJoIQp7XjE9aFW9ZODBntwSDmHJT8daDdZxX0lXi9eVfzeMCAA */
    id: 'app',
    initial: '/',
    states: {
      '/': {
        on: {
          click: [
            {
              target: '/user_account',
              guard: 'login',
            },
            '/user_account',
            {
              target: '/auth',
              guard: 'logout',
            },
          ],
          'button_get__/permission': {
            target: '/permission',
          },
          'button_get__/role': {
            target: '/role',
          },
          'Event 5': {
            target: '/order',
          },
        },
      },

      '/user_account': {
        initial: '/',
        states: {
          '/': {
            on: {
              '1': {
                target: '/register_user',
              },
              next: {
                target: '/:user_id',
              },
            },
          },
          '/:user_id': {
            initial: '/',
            states: {
              '/': {
                on: {
                  '1': {
                    target: '/user_info',
                  },
                  '2': {
                    target: '/transaction_item',
                  },
                  '5': {
                    target: '/update_user',
                  },
                  '6': {
                    target: '/delete_user',
                  },
                  '7': {
                    target: '/items_group',
                  },
                },
              },
              '/user_info': {
                states: {
                  'name: GetUser :one': {
                    description: 'ユーザー情報を取得するクエリ { users }',
                  },
                  'name: GetUserRole :one': {
                    description:
                      'ユーザーの権限を確認するクエリ, userテーブル、roleテーブル、user_id、',
                  },
                },
                type: 'parallel',
              },
              '/transaction_item': {
                initial: '/',
                states: {
                  '/': {
                    on: {
                      '1': {
                        target: '/user_invitation',
                      },
                      '2': {
                        target: '/register_item',
                      },
                      '3': {
                        target: '/item_info',
                      },
                      '4': {
                        target: '/make_transaction',
                      },
                    },
                  },
                  '/make_transaction': {
                    initial: '/',
                    states: {
                      '/': {
                        on: {
                          '1': {
                            target: '/transaction_history',
                          },
                        },
                      },
                      '/transaction_history': {
                        states: {
                          'オーダーテーブルから取引履歴をクエリ -> { order, transaction }': {},
                        },
                        type: 'parallel',
                      },
                    },
                    on: {
                      '1': {
                        target: '#app./order./request',
                      },
                    },
                  },
                  '/register_item': {
                    states: {
                      '勘定科目を登録する前にユーザーが登録上限を迎えていないかのため、ユーザー情報を取得するクエリ { users }':
                        {},
                      '勘定科目生成を実行するクエリ,生成された勘定科目は1つのuser_idをownerとして保持する -> { items }':
                        {},
                      'ユーザー登録時自動的にitemを生成するクエリ＜アプリケーションで対応する': {},
                    },
                    type: 'parallel',
                  },
                  '/user_invitation': {
                    initial: '/',
                    states: {
                      '/': {
                        on: {
                          '1': {
                            target: '/invitation_history',
                          },
                        },
                      },
                      '/invitation_history': {
                        states: {
                          'name: GetOrderHistory :many': {
                            tags: 'オーダーから招待履歴を取得するクエリ',
                          },
                        },
                        type: 'parallel',
                      },
                    },
                  },
                  '/item_info': {
                    states: {
                      'ユーザーが持つすべての勘定科目情報を取得  -> {items}': {},
                    },
                    type: 'parallel',
                  },
                },
              },
              '/delete_user': {
                states: {
                  'name: DeleteUser :one': {
                    description: 'ユーザー削除、userテーブル',
                  },
                },
                type: 'parallel',
              },
              '/items_group': {
                initial: '/',
                states: {
                  '/': {
                    on: {
                      '1': {
                        target: '/register_group',
                      },
                      '2': {
                        target: '/update_group',
                      },
                      '3': {
                        target: '/delete_group',
                      },
                      '4': {
                        target: '/group_info',
                      },
                    },
                  },
                  '/register_group': {
                    states: {
                      グループを登録するクエリ: {},
                      ユーザー登録時自動的にグループを生成するクエリ: {},
                    },
                    type: 'parallel',
                  },
                  '/update_group': {
                    states: {
                      グループ情報を変更するクエリ: {},
                    },
                    type: 'parallel',
                  },
                  '/delete_group': {
                    states: {
                      グループを削除するクエリ: {},
                    },
                    type: 'parallel',
                  },
                  '/group_info': {
                    states: {
                      グループ情報を取得するクエリ: {},
                    },
                    type: 'parallel',
                  },
                },
              },
              '/update_user': {
                states: {
                  ユーザー情報を更新するクエリ: {},
                },
                type: 'parallel',
              },
            },
          },
          '/register_user': {
            states: {
              'ユーザー登録: 新規ユーザーを作成するINSERTクエリ { users }': {},
            },
            type: 'parallel',
          },
        },
      },

      /**
authはstate型オブジェクトであり、さらにstates内に子stateを持つ
各stateはこstateを持つか、onで他stateを持つ
子stateは無条件にnextし、onで他stateへ向かうときは条件が伴う
stateは子stateを持つことができ、再帰的である
       */
      '/auth': {
        states: {
          '/': {
            on: {
              '1': {
                target: '/login',
              },
              '2': {
                target: '/logout',
              },
            },
          },
          '/login': {
            states: {
              '/': {
                // on: {
                //   unregisterd_user: '#app./user_account./register_user',
                //   registerd_user: 'authed',
                // },
              },

              authed: {
                description:
                  'トークン設計\n\n ヘッダ：HS256 \n\n トークン：JWT \n\n トークンの有効期限：1時間 \n\nペイロード：ユーザーID、ユーザー名、権限 \n\n シグネチャ：秘密鍵で署名 \n\n',
              },
            },
          },
          '/logout': {
            states: {
              'ユーザー認証: ユーザー情報を取得するクエリ { users }': {},
            },
            type: 'parallel',
          },
        },
      },

      '/permission': {
        states: {
          パーミッション一覧を取得するクエリ: {},
        },
        type: 'parallel',
      },

      '/role': {
        initial: '/',
        states: {
          '/': {
            on: {
              '5': {
                target: '/info',
              },
              div: {
                target: '/list',
              },
              'button_get__/role/register': {
                target: '/register',
              },
              'get__/role/edit': {
                target: '/edit',
              },
              'delete__/role/delete': {
                target: '/delete',
              },
            },
          },
          '/list': {
            states: {
              作成済みrole一覧を取得するクエリ: {},
            },
            type: 'parallel',
          },
          '/register': {
            states: {
              パーミッション一覧を取得するクエリ: {
                on: {
                  next: {
                    target: '該当roleの値に、パーミッション配列を追加するクエリ',
                  },
                },
              },
              '該当roleの値に、パーミッション配列を追加するクエリ': {},
            },
            type: 'parallel',
          },
          '/edit': {
            states: {
              パーミッション一覧を取得するクエリ: {
                on: {
                  next: {
                    target: '該当roleの値に、パーミッション配列を追加するクエリ',
                  },
                },
              },
              '該当roleの値に、パーミッション配列を追加するクエリ': {},
            },
            type: 'parallel',
          },
          '/delete': {
            states: {
              該当roleを削除するクエリ: {},
            },
            type: 'parallel',
          },
          '/info': {
            states: {
              ロール情報を取得するクエリ: {},
              ロール情報からユーザープランを取得するクエリ: {},
            },
            type: 'parallel',
          },
        },
      },

      '/order': {
        initial: '/',
        states: {
          '/': {
            on: {
              'button_post__/order/:orderId': {
                target: '/request',
              },
              url: {
                target: '/:orderId',
              },
              'button_get__/order/info/:feature': {
                target: '/:feature',
              },
            },
          },
          '/request': {
            states: {
              waitオーダーを新しいorderIdとともに追加するクエリ: {
                on: {
                  next: {
                    target: 'ユーザーのメールアドレスを送るためのクエリ',
                  },
                },
              },
              ユーザーのメールアドレスを送るためのクエリ: {},
            },
            type: 'parallel',
          },
          '/:orderId': {
            initial: '/',
            states: {
              '/': {
                on: {
                  'button_post__/order/:orderId/cancel': {
                    target: '/cancel',
                  },
                  url: {
                    target: '/verification',
                  },
                },
              },
              '/cancel': {
                states: {
                  オーダーをcancelに変更するクエリ: {},
                },
                type: 'parallel',
              },
              '/verification': {
                states: {
                  'オーダー現状をwait＞pendingに変更するクエリ': {},
                  認証するためのクエリ: {},
                },
                type: 'parallel',
              },
              'New state 1': {},
            },
            type: 'parallel',
          },
          '/:feature': {
            description: '/:transaction\n\n/:invite',
            states: {
              オーダー状況を取得するクエリ: {},
              開始時間から一定時間経過をしたオーダーを取得するクエリ: {},
            },
            type: 'parallel',
          },
          server: {
            states: {
              オーダー状況をpendingからdoneに変更するクエリ: {},
            },
            type: 'parallel',
          },
        },
      },

      '「ユーザーにアカウントをもたせ、ownerユーザーがアカウントに他のownerユーザーを招待し、アカウント内で数値を取引する」という要件':
        {
          states: {
            'user x ownerの中間テーブル': {},
            'account x item & transaction': {},
            'item x transaction': {},
          },
          type: 'parallel',
        },

      tables: {
        description:
          '\\-- usersテーブル -- ユーザーの基本情報を保持。\n\n\\-- sheetsテーブル -- ユーザーの口座残高情報を保持。 -- accountsの集合体を意味する。\n\n\\-- accountsテーブル -- 勘定科目情報を保持。\n\n\\-- transactionsテーブル -- 勘定科目間の取引を保持。\n\n\\-- rolesテーブル -- sheetの役割情報を保持。 -- userに対して与える、permissionの集合体を意味する。\n\n\\-- permissionsテーブル -- ユーザーの権限。\n\n\\-- ordersテーブル -- オーダー情報。\n\n\\-- 関連性 -- usersとsheets: 多対多の関連。一人のユーザーが複数の口座を持つことができ、一つの口座は複数のユーザーに割り当てられる。これを管理するために中間テーブル（例：users_sheets）が必要。 -- sheetsとaccounts: 一対多の関連。一つの口座に対して複数の勘定科目が存在する。 -- sheetsとtransactions: 一対多の関連。一つの口座に対して複数の取引が存在する。 -- sheetsとroles: roles値のうちownerは1つのsheetsに対し1つのみ割り当てられる -- usersとroles: 多対多の関連。一人のユーザーが複数の役割を持つことができ、一つの役割は複数のユーザーに割り当てられる。これを管理するために中間テーブル（例：users_roles）が必要。 -- rolesとpermissions: 多対多の関連。一つの役割に複数の権限が割り当てられ、一つの権限は複数の役割に適用される。これも中間テーブル（例：roles_permissions）が必要。 -- accountsとtransactions: 多対多の関連。一つの取引に複数の勘定科目が関与し、一つの勘定科目は複数の取引に関与する',
      },
    },
    types: {
      events: {} as
        | { type: '1' }
        | { type: '2' }
        | { type: '3' }
        | { type: '4' }
        | { type: '5' }
        | { type: '6' }
        | { type: '7' }
        | { type: 'div' }
        | { type: 'url' }
        | { type: 'next' }
        | { type: 'click' }
        | { type: 'authed' }
        | { type: 'Event 5' }
        | { type: 'get__/role/edit' }
        | { type: 'button_get__/role' }
        | { type: 'delete__/role/delete' }
        | { type: 'button_get__/permission' }
        | { type: 'button_get__/role/register' }
        | { type: 'button_post__/order/:orderId' }
        | { type: 'button_get__/order/info/:feature' }
        | { type: 'button_post__/order/:orderId/cancel' },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {
      login: ({ context, event }, params) => {
        return false
      },
      logout: ({ context, event }, params) => {
        return false
      },
    },
    delays: {},
  },
)
