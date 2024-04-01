import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as sharp from 'sharp';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { ScorecardEntity } from 'src/entities/scorecard';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/entities/account.entity';

const blue = '#0554F2';

const fontMedium = join(__dirname, '../../assets/fonts/AlbertSans-Medium.ttf');
const fontBold = join(__dirname, '../../assets/fonts/AlbertSans-ExtraBold.ttf');
const fontBlack = join(__dirname, '../../assets/fonts/AlbertSans-Black.ttf');

const createTextSVG = async (
  text: string,
  width: number,
  height: number,
  color: string,
  textAnchor: 'start' | 'middle' | 'end',
  fontSize: number,
) => {
  return await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
              <text x="100%" y="50%" dominant-baseline="middle"
                text-anchor="${textAnchor}"
                font-size="${fontSize}"
                fill="${color}"
                font-family="Albert Sans"
              >
                ${text}
              </text>
            </svg>`),
        blend: 'dest-over',
      },
    ])
    .png()
    .toBuffer();
};

type item = {
  rareness: 'common' | 'rare' | 'special';
  points: number;
  tokens: {
    tokenId: number;
    quantity: number;
  }[];
};

@Injectable()
export class OgpService {
  constructor(
    @InjectRepository(ScorecardEntity)
    private readonly scorecardRepository: Repository<ScorecardEntity>,
  ) {}

  async generateSquareOgp(totalPoint: number, address: string, items: item[]) {
    const base = readFileSync(
      join(__dirname, '../../assets/images/ogp/square-base.png'),
    );

    const container = sharp(base);

    const point = await sharp({
      text: {
        text: `<span foreground="${blue}" font_weight="bold">${totalPoint}</span>`,
        font: 'Albert Sans',
        fontfile: fontBold,
        rgba: true,
        width: 550,
        height: 84,
      },
    })
      .png()
      .toBuffer();

    const pointLabel = await sharp({
      text: {
        text: `<span foreground="${blue}" font_weight="bold">$BALL</span>`,
        font: 'Albert Sans',
        fontfile: fontBold,
        rgba: true,
        width: 150,
        height: 34,
      },
    })
      .png()
      .toBuffer();

    const addressImage = await sharp({
      text: {
        text: `<span foreground="black">${
          address.slice(0, 6) + '...' + address.slice(-4)
        }</span>`,
        font: 'Albert Sans',
        fontfile: fontMedium,
        rgba: true,
        width: 550,
        height: 28,
      },
    })
      .png()
      .toBuffer();

    const itemsContainer = await Promise.all(
      items.map(async (item, index) => {
        const ballImage = readFileSync(
          join(__dirname, `../../assets/images/ogp/ball_${item.rareness}.png`),
        );
        const ball = await sharp(ballImage).resize(72, 72).png().toBuffer();
        return {
          input: ball,
          left: 51,
          top: 616 + index * 125,
        };
      }),
    );
    const pointsContainer = await Promise.all(
      items.map(async (item, index) => {
        const points = await sharp({
          text: {
            text: `<span foreground="black" font_weight="bold">${item.points}</span>`,
            font: 'Albert Sans',
            fontfile: fontBold,
            rgba: true,
            width: 550,
            height: 45,
          },
        })
          .png()
          .toBuffer();
        return {
          input: points,
          left: 155,
          top: 630 + index * 128,
        };
      }),
    );
    const pointLabelsContainer = await Promise.all(
      items.map(async (item, index) => {
        const points = await sharp({
          text: {
            text: `<span foreground="black" font_weight="bold">$BALL</span>`,
            font: 'Albert Sans',
            fontfile: fontBlack,
            rgba: true,
            width: 100,
            height: 23,
          },
        })
          .png()
          .toBuffer();
        return {
          input: points,
          left: 180 + item.points.toString().length * 40,
          top: 652 + index * 128,
        };
      }),
    );

    const itemsImageContainer = await Promise.all(
      items.map(async (item, index) => {
        const itemImages = await Promise.all(
          item.tokens
            .filter((t) => t.quantity > 0)
            .map(async (token, tokenIndex) => {
              const itemImage = readFileSync(
                join(
                  __dirname,
                  `../../assets/images/ogp/gasha_item/${token.tokenId}.png`,
                ),
              );
              const img = await sharp(itemImage)
                .resize(96, 96)
                .png()
                .toBuffer();
              return {
                input: img,
                left: 548 + tokenIndex * 210,
                top: 604 + index * 125,
              };
            }),
        );

        return itemImages;
      }),
    );

    const itemsQuantityContainer = await Promise.all(
      items.map(async (item, index) => {
        const quantityImages = await Promise.all(
          item.tokens
            .filter((t) => t.quantity > 0)
            .map(async (token, tokenIndex) => {
              const img = await sharp({
                text: {
                  text: `<span foreground="black" font_weight="bold">x ${token.quantity}</span>`,
                  font: 'Albert Sans',
                  fontfile: fontBold,
                  rgba: true,
                  width: 100,
                  height: 23,
                },
              })
                .png()
                .toBuffer();
              return {
                input: img,
                left: 660 + tokenIndex * 215,
                top: 642 + index * 125,
              };
            }),
        );

        return quantityImages;
      }),
    );

    container.composite([
      {
        input: point,
        left: 50,
        top: 250,
      },
      {
        input: pointLabel,
        left: 50,
        top: 360,
      },
      {
        input: addressImage,
        left: 53,
        top: 425,
      },
      ...itemsContainer.filter((c) => c),
      ...pointsContainer.filter((c) => c),
      ...pointLabelsContainer.filter((c) => c),
      ...itemsImageContainer.flat().filter((c) => c),
      ...itemsQuantityContainer.flat().filter((c) => c),
    ]);

    const buffer = await container.toBuffer();
    return buffer;
  }

  async generateRectangleOgp() {
    const base = readFileSync(
      join(__dirname, '../../assets/images/ogp/rectangle-base.png'),
    );

    const container = sharp(base);

    const pointNum = '200900';
    const point = await createTextSVG(pointNum, 512, 128, blue, 'end', 80);
    const pointLabel = await createTextSVG('$BALL', 150, 64, blue, 'end', 40);
    const address = await createTextSVG(
      '0x12...678E',
      256,
      64,
      'black',
      'end',
      40,
    );

    const items = [
      {
        rareness: 'special',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'rare',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'common',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
    ];

    const itemsContainer = await Promise.all(
      items.map(async (item, index) => {
        const ballImage = readFileSync(
          join(__dirname, `../../assets/images/ogp/ball_${item.rareness}.png`),
        );
        const ball = await sharp(ballImage).resize(72, 72).png().toBuffer();
        return {
          input: ball,
          left: 480,
          top: 300 + index * 110,
        };
      }),
    );
    const pointsContainer = await Promise.all(
      items.map(async (item, index) => {
        const point = await createTextSVG(
          item.points.toString(),
          256,
          64,
          'black',
          'end',
          40,
        );
        return {
          input: point,
          left: 480,
          top: 320 + index * 110,
        };
      }),
    );
    const pointLabelsContainer = await Promise.all(
      items.map(async (item, index) => {
        const pointLabel = await createTextSVG(
          '$BALL',
          256,
          64,
          'black',
          'end',
          20,
        );
        return {
          input: pointLabel,
          left: 570,
          top: 320 + index * 110,
        };
      }),
    );

    container.composite([
      {
        input: point,
        left: 740,
        top: 60,
      },
      {
        input: pointLabel,
        left: 1100,
        top: 150,
      },
      {
        input: address,
        left: 1000,
        top: 200,
      },
      ...itemsContainer,
      ...pointsContainer,
      ...pointLabelsContainer,
    ]);

    const buffer = await container.toBuffer();
    return buffer;
  }

  async getResult(id: number) {
    const res = await this.scorecardRepository.findOne({ where: { id } });

    return res;
  }

  async saveResult(address: string, result: any[]) {
    // ここで結果を保存する処理を書く
    const res = await this.scorecardRepository.save({
      address,
      result,
      date: Math.ceil(new Date().getTime() / 1000),
    });

    return res;
  }

  async generateLeaderboardOgp(
    leaderBoard: AccountEntity[],
    me: AccountEntity | null,
    totalPoints: number,
  ) {
    const base = readFileSync(
      join(
        __dirname,
        me
          ? '../../assets/images/ogp/leaderboard_me.png'
          : '../../assets/images/ogp/leaderboard.png',
      ),
    );

    const container = sharp(base).resize(1000, 1000);

    const addressListContainer = await Promise.all(
      leaderBoard.map(async (account, index) => {
        const point = await sharp({
          text: {
            text: `<span>${account.address.slice(0, 6) + '...' + account.address.slice(-4)}</span>`,
            font: 'Albert Sans',
            fontfile: fontMedium,
            rgba: true,
            width: 550,
            height: 27,
          },
        })
          .png()
          .toBuffer();

        return {
          input: point,
          left: 90,
          top: 284 + index * 168,
        };
      }),
    );

    const pointListContainer = await Promise.all(
      leaderBoard.map(async (account, index) => {
        const point = await createTextSVG(
          account.points.toString(),
          420,
          80,
          'black',
          'end',
          54,
        );

        return {
          input: point,
          left: 500,
          top: 263 + index * 168,
        };
      }),
    );

    const winnigRateContainer = await Promise.all(
      leaderBoard.map(async (account, index) => {
        const point = await createTextSVG(
          `WIN RATE ${((account.points / totalPoints) * 100).toFixed(3)} %`,
          417,
          80,
          'black',
          'end',
          20,
        );

        return {
          input: point,
          left: 500,
          top: 293 + index * 168,
        };
      }),
    );

    container.composite([
      ...addressListContainer,
      ...pointListContainer,
      ...winnigRateContainer,
    ]);

    const buffer = await container.toBuffer();
    return buffer;
  }
}
