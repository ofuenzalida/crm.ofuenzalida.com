<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Repair
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property Carbon|null $date_start
 * @property Carbon|null $date_end
 * @property int $users_id
 * @property int $users_id_responsible
 * @property int $properties_id
 * @property int|null $priorities_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Priority|null $priority
 * @property Property $property
 * @property User $user
 * @property Collection|RepairsItem[] $repairs_items
 * @property Collection|RepairsTool[] $repairs_tools
 *
 * @package App\Models
 */
class Repair extends Model
{
	use SoftDeletes;
	protected $table = 'repairs';

	protected $casts = [
		'users_id' => 'int',
		'users_id_responsible' => 'int',
		'properties_id' => 'int',
		'priorities_id' => 'int'
	];

	protected $dates = [
		'date_start',
		'date_end'
	];

	protected $fillable = [
		'name',
		'description',
		'date_start',
		'date_end',
		'users_id',
		'users_id_responsible',
		'properties_id',
		'priorities_id'
	];

	public function priority()
	{
		return $this->belongsTo(Priority::class, 'priorities_id');
	}

	public function property()
	{
		return $this->belongsTo(Property::class, 'properties_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id_responsible');
	}

	public function repairs_items()
	{
		return $this->hasMany(RepairsItem::class, 'repairs_id');
	}

	public function repairs_tools()
	{
		return $this->hasMany(RepairsTool::class, 'repairs_id');
	}
}
