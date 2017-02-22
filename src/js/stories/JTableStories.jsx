// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { JTable, TableRow, TableCell } from '../components';

//--------------------------------------------------------------------------
//
//  Story index
//
//--------------------------------------------------------------------------

storiesOf('JTable', module)
    .add('Basic', basic)
;


//--------------------------------------------------------------------------
//
//  Data
//
//--------------------------------------------------------------------------

const rowHeaders =
    [ "Score", "Batsman",            "For",         "Against",      "Innings", "Test", "Ground",                                    "Date"];
const rowData = [
    [ "400",   "Brian Lara",         "West Indies", "England",      "1st",     "4th",  "Antigua Recreation Ground, St John's",      "10 April 2004"    ],
    [ "380",   "Matthew Hayden",     "Australia",   "Zimbabwe",     "1st",     "1st",  "WACA Ground, Perth",                        "9 October 2003"   ],
    [ "375",   "Brian Lara",         "West Indies", "England",      "1st",     "5th",  "Antigua Recreation Ground, St John's",      "16 April 1994"    ],
    [ "374",   "Mahela Jayawardene", "Sri Lanka",   "South Africa", "1st",     "1st",  "Sinhalese S.C., Colombo",                   "27 July 2006"     ],
    [ "365",   "Garfield Sobers",    "West Indies", "Pakistan",     "1st",     "3rd",  "Sabina Park, Kingston",                     "26 February 1958" ],
    [ "364",   "Len Hutton",         "England",     "Australia",    "1st",     "5th",  "The Oval, London",                          "20 August 1938"   ],
    [ "340",   "Sanath Jayasuriya",  "Sri Lanka",   "India",        "1st",     "1st",  "R. Premadasa Stadium, Colombo",             "2 August 1997"    ],
    [ "337",   "Hanif Mohammad",     "Pakistan",    "West Indies",  "2nd",     "1st",  "Kensington Oval, Bridgetown",               "17 January 1958"  ],
    [ "336",   "Wally Hammond",      "England",     "New Zealand",  "1st",     "2nd",  "Eden Park, Auckland",                       "31 March 1933"    ],
    [ "334",   "Donald Bradman",     "Australia",   "England",      "1st",     "3rd",  "Headingley, Leeds",                         "11 July 1930"     ],
    [ "334",   "Mark Taylor",        "Australia",   "Pakistan",     "1st",     "2nd",  "Arbab Niaz Stadium, Peshawar",              "15 October 1998"  ],
    [ "333",   "Graham Gooch",       "England",     "India",        "1st",     "1st",  "Lord's Cricket Ground, London",             "26 July 1990"     ],
    [ "333",   "Chris Gayle",        "West Indies", "Sri Lanka",    "1st",     "1st",  "Galle International Stadium",               "15 November 2010" ],
    [ "329",   "Inzamam-ul-Haq",     "Pakistan",    "New Zealand",  "1st",     "1st",  "Gaddafi Stadium, Lahore",                   "1 May 2002"       ],
    [ "329",   "Michael Clarke",     "Australia",   "India",        "1st",     "2nd",  "Sydney Cricket Ground",                     "3 January 2012"   ],
    [ "325",   "Andy Sandham",       "England",     "West Indies",  "1st",     "4th",  "Sabina Park, Kingston",                     "3 April 1930"     ],
    [ "319",   "Virender Sehwag",    "India",       "South Africa", "1st",     "1st",  "M. A. Chidambaram Stadium, Chennai",        "26 March 2008"    ],
    [ "319",   "Kumar Sangakkara",   "Sri Lanka",   "Bangladesh",   "1st",     "2nd",  "Zohur Ahmed Chowdhury Stadium, Chittagong", "5 February 2014"  ],
    [ "317",   "Chris Gayle",        "West Indies", "South Africa", "1st",     "4th",  "Antigua Recreation Ground, St John's",      "29 April 2005"    ],
    [ "313",   "Younis Khan",        "Pakistan",    "Sri Lanka",    "1st",     "1st",  "National Stadium, Karachi",                 "21 February 2009" ]];
const colWidths =
    [ 40,      200,                  90,            90,             40,        40,     200,                                         130 ];

//--------------------------------------------------------------------------
//
//  Helpers
//
//--------------------------------------------------------------------------

function container(children) {

    const style = {
        margin: "1em"
    };

    return (
        <div style={style}>{children}</div>
    );
}

function renderRow(rowData) {
    const key = rowData[1] + rowData[0];
    return (
        <TableRow key={key}>{ rowData.map(renderCell) }</TableRow>
    );
}

function renderCell(cellValue, i) {
    return (
        <TableCell key={i}>{cellValue}</TableCell>
    );
}


//--------------------------------------------------------------------------
//
//  Story renderers
//
//--------------------------------------------------------------------------

function basic() {

    const rows = rowData.map(renderRow);
    const columns = [];

    for (let i = 0; i < colWidths.length; i++) {
        columns.push(JTable.column(colWidths[i]));
    }

    columns[1].isFlexible = true;
    columns[6].isFlexible = true;

    return container(
        <JTable columns={columns}>
            {rows}
        </JTable>
    )
}

