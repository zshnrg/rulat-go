import { getAllRulat, new_log, updateRulatStatus } from "@/services/rulat";
import { getUserByNIM } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
    // Check if the request has the correct secret bearer token
    if (request.headers.get("Authorization") !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Getting rulat data
    const { data: dataRulat, error: errorRulat } = await getAllRulat();
    if (errorRulat) {
        return NextResponse.json({ errorRulat }, { status: 500 });
    }
    if (!dataRulat) {
        return NextResponse.json({ error: "Rulat data not found" }, { status: 404 });
    }
    const rulat = dataRulat;
    let open: any[] = [];
    for (let i = 0; i < rulat.length; i++) {
        if (rulat[i].is_open) {
            open.push(rulat[i].id);
        }
    }

    if (open.length === 0) {
        return NextResponse.json({ message: "No rulat to close" });
    }

    // getting user with nim 99999999
    const { data: dataUser, error: errorUser } = await getUserByNIM('99999999');
    if (errorUser) {
        return NextResponse.json({ errorUser }, { status: 500 });
    }
    if (!dataUser) {
        return NextResponse.json({ error: "Satpam data not found" }, { status: 404 });
    }
    const user: any = dataUser[0]; // Update the type of 'user' to 'any'
    console.log("User:", user);

    for (let i = 0; i < open.length; i++) {
        //  closing rulat
        console.log("Mengubah status... id:", open[i], "status: false");
        const { data: updateData, error: updateError } = await updateRulatStatus(open[i], false);
        if (updateError) {
            return NextResponse.json({ updateError }, { status: 500 });
        }
        // create log
        console.log("Membuat log... id:", open[i], "act: Tutup user_id:", user.id);
        const { data: logData, error: logError } = await new_log(user.id, open[i], "Tutup");
        if (logError) {
            return NextResponse.json({ logError }, { status: 500 });
        }
    }

    return NextResponse.json({ message: "Success" });
}