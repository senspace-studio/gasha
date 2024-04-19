import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as sharp from 'sharp';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { ScorecardEntity } from 'src/entities/scorecard';
import { Repository } from 'typeorm';

const fontRegular = join(
  __dirname,
  '../../assets/fonts/BigelowRules-Regular.ttf',
);

const white = '#FFFFFF';
const yellow = '#FFD700';

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

type Item = {
  tokenId: number;
  quantity: number;
  point: number;
};

@Injectable()
export class OgpService {
  constructor(
    @InjectRepository(ScorecardEntity)
    private readonly scorecardRepository: Repository<ScorecardEntity>,
  ) {}

  async generateSquareOgp(totalPoint: number, address: string, items: Item[]) {
    const base = readFileSync(
      join(__dirname, '../../assets/images/ogp/square-base.png'),
    );

    const container = sharp(base).resize(1000, 1000);

    const point = await sharp({
      text: {
        text: `<span foreground="${white}" font_weight="bold">${totalPoint}</span>`,
        font: 'Bigelow Rules',
        fontfile: fontRegular,
        rgba: true,
        width: 250,
        height: 64,
      },
    })
      .png()
      .toBuffer();

    const eachQuantity = await Promise.all(
      items.map(async (item, index) => {
        const quantity = item.quantity;
        const input = await sharp({
          text: {
            text: `<span foreground="${white}" font_weight="bold"
            >x ${quantity}</span>`,
            font: 'Bigelow Rules',
            fontfile: fontRegular,
            rgba: true,
            width: 250,
            height: 25,
          },
        })
          .png()
          .toBuffer();
        return {
          input,
          left: 780 - quantity.toString().length * 2,
          top: 120 + index * 42,
        };
      }),
    );

    const eachPoints = await Promise.all(
      items.map(async (item, index) => {
        const input = await sharp({
          text: {
            text: `<span foreground="${white}" font_weight="bold"
            >${item.point}</span>`,
            font: 'Bigelow Rules',
            fontfile: fontRegular,
            rgba: true,
            width: 250,
            height: 25,
          },
        })
          .png()
          .toBuffer();
        return {
          input,
          left: 910 - item.point.toString().length * 5,
          top: 120 + index * 42,
        };
      }),
    );

    const addressImage = await sharp({
      text: {
        text: `<span foreground="white">${
          address.slice(0, 6) + '...' + address.slice(-4)
        }</span>`,
        font: 'Bigelow Rules',
        fontfile: fontRegular,
        rgba: true,
        width: 550,
        height: 40,
        align: 'left',
      },
    })
      .png()
      .toBuffer();

    container.composite([
      ...eachPoints,
      ...eachQuantity,
      {
        input: point,
        left: 700 - totalPoint.toString().length * 15,
        top: 830,
      },
      {
        input: addressImage,
        left: 387,
        top: 764,
      },
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
    const point = await createTextSVG(pointNum, 512, 128, white, 'end', 80);
    const pointLabel = await createTextSVG('$BALL', 150, 64, white, 'end', 40);
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
    leaderBoard: { address: string; points: number }[],
    me: { address: string; points: number } | null,
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
            fontfile: fontRegular,
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
